import React, { useContext, useEffect, useState } from 'react'
import InviteUser from '../../../components/Games/InviteUser';
import { selectLoggedInUser } from '../../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { MyContext } from '../../../Context/SocketContext';

const Player = () => {

    const loggedInUSER = useSelector(selectLoggedInUser);
    const { globalSocket, onlineUsers } = useContext(MyContext);
    const [boxes, setBoxes] = useState([{ num: 0, value: '' }, { num: 1, value: '' }, { num: 2, value: '' }, { num: 3, value: '' }, { num: 4, value: '' }, { num: 5, value: '' }, { num: 6, value: '' }, { num: 7, value: '' }, { num: 8, value: '' }]);

    const [turn, setTurn] = useState("X");
    const [showSelectUser, setShowSelectUser] = useState(true);
    const [opponentUser, setOpponentUser] = useState({ name: "Admin", _id: "66e516224c5d47baf21e9412" });
    const [currentUser, setCurrentUser] = useState({ name: loggedInUSER.name, _id: loggedInUSER._id });

    const [selectedBox, setSelectedBox] = useState([]);

    const handleSelectUser = (selectedUser) => {
        setShowSelectUser(false);
        setOpponentUser(selectedUser);
    }

    function check() {
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
                console.log("WINS");
                console.log("WINS : " + turn);
            }
        })


    }

    const handleClick = (data, user) => {

        let newBoxes = boxes.map((e) => ({ ...e }));
        console.log(selectedBox);
        // check();

        if (user == "currentUser") {
            newBoxes[data.num].value = turn;
            data.value = turn;
            globalSocket.emit("send-game", { sender: currentUser, receiver: opponentUser, data: data, category: "games", game: "tictactoe" });
        } else {
            newBoxes[data.num].value = data.value;
        }
        console.log(newBoxes);

        setBoxes([...newBoxes])
        setSelectedBox((prev) => [...prev, data])

    }

    useEffect(() => {
        setTurn((turn) => turn == "X" ? "O" : "X")
    }, [selectedBox])

    useEffect(() => {

        globalSocket.on("receive-game", ({ sender, receiver, category, game, data }) => {

            if (data == "reset") {
                handleReset("opponentUser");
            } else {
                console.log(data);
                setBoxes((prev) => {
                    prev[data.num].value = data.value;
                    return prev;
                })
                setSelectedBox((prev) => [...prev, data])
                // handleClick(data, "opponentUser");
            }

        })

        return () => globalSocket?.off("receive-game");

    }, [])

    const handleReset = (user) => {

        if (user == "currentUser") {
            globalSocket.emit("send-game", { sender: currentUser, receiver: opponentUser, data: "reset", category: "games", game: "tictactoe" });
        }

        setBoxes((prev) => {
            return [{ num: 0, value: '' }, { num: 1, value: '' }, { num: 2, value: '' }, { num: 3, value: '' }, { num: 4, value: '' }, { num: 5, value: '' }, { num: 6, value: '' }, { num: 7, value: '' }, { num: 8, value: '' }]
        });
        setSelectedBox([]);
        setTurn("X");
        // setWinner({ name: "", show: false });
        // finalWinner = false;
    }

    console.log(selectedBox);

    return (
        <div className='size-full flex flex-col gap-4 justify-start items-center relative'>

            {/* NAMES OF PERSON */}
            <div className='w-full flex justify-between items-center p-2'>
                <p className='w-[150px] bg-red-500 p-2 rounded-lg capitalize text-center'>{currentUser.name}</p>
                <p className='w-[150px] bg-red-500 p-2 rounded-lg capitalize text-center'>{opponentUser.name}</p>
            </div>

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

            {
                showSelectUser
                &&
                <InviteUser handleSelectUser={handleSelectUser} />
            }

        </div>
    )
}

export default Player