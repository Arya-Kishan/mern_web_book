import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../Context/SocketContext';
import { TicTacBoxes } from '../../../Constants';
import { toast } from 'react-toastify';

const Player = ({ currentUser, opponentUser }) => {

    const { globalSocket, onlineUsers } = useContext(MyContext);

    const [boxes, setBoxes] = useState(JSON.parse(JSON.stringify(TicTacBoxes))); // required for deep copying the tictacboxes
    const [turn, setTurn] = useState("X");
    const [whoseTurn, setWhoseTurn] = useState("");
    const [winner, setWinner] = useState({ name: "", show: false });
    const [isOpponentAvailable, setIsOpponentAvailable] = useState(false);
    const [selectedBox, setSelectedBox] = useState([]);

    function check(user) {
        let winsArr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        winsArr.forEach((e, i) => {
            if (boxes[e[0]].value === boxes[e[1]].value && boxes[e[1]].value === boxes[e[2]].value && boxes[e[0]].value !== "") {
                setWinner({ name: user.name, show: true });
                let winnerBoxes = JSON.parse(JSON.stringify(boxes));
                winnerBoxes[e[0]].bgColor = true;
                winnerBoxes[e[1]].bgColor = true;
                winnerBoxes[e[2]].bgColor = true;
                setBoxes(winnerBoxes)
            }
        })

    }

    const handleClick = (data, user) => {

        if (winner.show) {
            return toast("WINNER DECLARED")
        }

        if (!isOpponentAvailable) {
            return toast("OPPONENT NOT JOINED")
        }

        if (whoseTurn.name !== currentUser.name) {
            return toast("OPPONENT TURN")
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
    }

    const handleReset = (user) => {

        if (user == "currentUser") {
            globalSocket.emit("send-game", { sender: currentUser, receiver: opponentUser, data: "reset", category: "games", game: "Tic Tac Toe" });
        }

        console.log(TicTacBoxes);
        setBoxes(JSON.parse(JSON.stringify(TicTacBoxes)));
        setSelectedBox([]);
        setTurn("X");
        setWinner({ name: "", show: false });
    }

    const handleUserLeft = () => {
        setIsOpponentAvailable(false);
        setBoxes(JSON.parse(JSON.stringify(TicTacBoxes)));
        toast("left the game")
    }

    useEffect(() => {
        setTurn((turn) => turn == "X" ? "O" : "X")
        setWhoseTurn((user) => {
            return user.name == currentUser.name ? opponentUser : currentUser
        })
        check(whoseTurn);
    }, [selectedBox])

    useEffect(() => {

        globalSocket.on("receive-game", ({ sender, receiver, category, game, data }) => {

            if (data == "reset") {
                handleReset("opponentUser");
            } else if (data == "left") {
                handleUserLeft();
            } else {
                setBoxes((prev) => {
                    prev[data.num].value = data.value;
                    return prev;
                })
                setSelectedBox((prev) => [...prev, data])
            }

        })

        globalSocket.on("receive-game-player-joined", ({ sender, receiver, category, game, data, firstTurn }) => {
            setWhoseTurn(firstTurn);
            if (sender.name == opponentUser.name) {
                setIsOpponentAvailable(true);
            }
        })

        return () => {
            globalSocket?.off("receive-game");
            globalSocket?.off("receive-game-player-joined");
        };

    }, [])

    useEffect(() => {

        return () => {
            if (isOpponentAvailable) {
                globalSocket.emit("send-game", {
                    sender: currentUser,
                    receiver: opponentUser,
                    data: "left",
                    category: "games",
                    game: "Tic Tac Toe"
                });
            }
        }

    }, [isOpponentAvailable])

    useEffect(() => {
        console.log(onlineUsers);
        if (!onlineUsers.includes(opponentUser._id)) {
            handleUserLeft();
        }

    }, [onlineUsers])

    return (
        <div className='size-full flex flex-col gap-4 justify-center items-center'>

            {/* 9 BOXES */}
            <div className='w-fit grid grid-rows-3 grid-cols-3 gap-4'>
                {boxes.map((e, i) => (
                    <div
                        key={i}
                        className={`w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex justify-center items-center text-[40px] sm:text-[80px] transition-colors duration-500 ${e?.bgColor ? "bg-teal-500" : "bg-yellow-500"}`}
                        onClick={() => { selectedBox.map((e) => e.num).includes(e.num) ? "" : handleClick(e, "currentUser") }}
                    >{e.value}</div>
                ))}
            </div>

            <div className='w-full flex flex-col md:flex-row gap-5 justify-between items-center uppercase'>
                {!winner.show && <div>TURN OF {whoseTurn?.name} : {turn}</div>}
                {winner.show && <div>WINNER IS {winner.name}</div>}
                <div
                    onClick={() => { handleReset("currentUser") }}
                    className='w-[100px] rounded-md text-center bg-blue1 p-2'
                >RESET</div>
            </div>

            {
                !isOpponentAvailable
                &&
                <div className='w-[220px] h-fit fixed sm:absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-bgFilterPop rounded-2xl opacity-[0.8] flex justify-center items-center p-2'>
                    {
                        isOpponentAvailable
                            ?
                            ""
                            :
                            <div className='flex flex-col justify-center items-center gap-4'>
                                <p>WAITING FOR OPPONENT</p>
                                <p>TO JOIN</p>
                                <p className='w-[20px] h-[20px] rounded-full bg-gradient-to-tr from-bg-card to-customGreen animate-spin'></p>
                            </div>
                    }
                </div>
            }

        </div>
    )
}

export default Player