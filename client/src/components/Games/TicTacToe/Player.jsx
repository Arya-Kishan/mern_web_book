import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../Context/SocketContext';
import { TicTacBoxes } from '../../../Constants';

const Player = ({ currentUser, opponentUser }) => {

    const { globalSocket, onlineUsers } = useContext(MyContext);

    const [boxes, setBoxes] = useState(TicTacBoxes);
    const [turn, setTurn] = useState("X");
    const [isOpponentAvailable, setIsOpponentAvailable] = useState(false);
    const [selectedBox, setSelectedBox] = useState([]);

    const handleClick = (data, user) => {

        if (!isOpponentAvailable) {
            return toast("OPPONENT NOT AVAILABLE")
        }

        let newBoxes = boxes.map((e) => ({ ...e }));

        if (user == "currentUser") {
            newBoxes[data.num].value = turn;
            data.value = turn;
            globalSocket.emit("send-game", { sender: currentUser, receiver: opponentUser, data: data, category: "games", game: "Tic Tac Toe" });
        } else {
            newBoxes[data.num].value = data.value;
        }

        setBoxes([...newBoxes])
        setSelectedBox((prev) => [...prev, data])
        setTurn((turn) => turn == "X" ? "O" : "X")

    }

    const handleReset = (user) => {

        if (user == "currentUser") {
            globalSocket.emit("send-game", { sender: currentUser, receiver: opponentUser, data: "reset", category: "games", game: "Tic Tac Toe" });
        }

        setBoxes((prev) => TicTacBoxes);
        setSelectedBox([]);
        setTurn("X");
    }

    useEffect(() => {

        globalSocket.on("receive-game", ({ sender, receiver, category, game, data }) => {

            if (data == "reset") {
                handleReset("opponentUser");
            } else {
                setBoxes((prev) => {
                    prev[data.num].value = data.value;
                    return prev;
                })
                setSelectedBox((prev) => [...prev, data])
                setTurn((turn) => turn == "X" ? "O" : "X")
            }

        })

        globalSocket.on("receive-game-player-joined", ({ sender, receiver, category, game, data }) => {
            if (sender.name == opponentUser.name) {
                setIsOpponentAvailable(true);
            }
        })

        return () => {
            globalSocket?.off("receive-game");
            globalSocket?.off("receive-game-player-joined");
        };

    }, [])

    return (
        <div className='size-full flex flex-col gap-4 justify-start items-center relative'>

            {/* 9 BOXES */}
            <div className='w-fit grid grid-rows-3 grid-cols-3 gap-4'>
                {boxes.map((e, i) => (
                    <div
                        key={i}
                        className='w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex justify-center items-center text-[40px] sm:text-[80px] transition-colors duration-500 bg-yellow-500 hover:bg-teal-500'
                        onClick={() => { selectedBox.map((e) => e.num).includes(e.num) ? "" : handleClick(e, "currentUser") }}
                    >{e.value}</div>
                ))}
            </div>

            <div>TURN OF {turn}</div>

            <div onClick={() => { handleReset("currentUser") }}>RESET</div>

            <div>{isOpponentAvailable ? "JOINED" : 'WAITING FOR PLAYER TO JOINED'}</div>

        </div>
    )
}

export default Player