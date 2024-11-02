import React, { useState } from 'react'
import { selectLoggedInUser } from '../../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';

let finalWinner = false;
const Computer = () => {

    const loggedInUSER = useSelector(selectLoggedInUser);
    const [boxes, setBoxes] = useState([{ num: 0, value: '' }, { num: 1, value: '' }, { num: 2, value: '' }, { num: 3, value: '' }, { num: 4, value: '' }, { num: 5, value: '' }, { num: 6, value: '' }, { num: 7, value: '' }, { num: 8, value: '' }]);

    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState({ name: "", show: false });

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
                console.log("WINS : " + user);
                setWinner({ name: user, show: true })
                finalWinner = true;
            }
        })

    }

    const handleClick = (clickedBox) => {

        // IT'S NOT USER TURN - ALREADY CLICKED BOX - NO MORE BOXES LEFT TO BE CLICKED - WINNER ALREADY DECLARED
        if (turn == "O" || selectedBox.map((e) => e.num).includes(clickedBox.num) || selectedBox.length >= 9 || winner.show) {
            return 0;
        }

        let newBoxes = boxes;
        newBoxes[clickedBox.num].value = turn;
        setBoxes([...newBoxes])
        setTurn((turn) => turn == "X" ? "O" : "X")
        setSelectedBox((prev) => [...prev, clickedBox])

        check(loggedInUSER.name);

        setTimeout(() => {
            computerMoves(turn == "X" ? "O" : "X", clickedBox);
        }, 500);
    }

    const computerMoves = (move, clickedBox) => {

        // NO MORE MOVES LEFT - WINNER ALREADY DECLARED
        if (selectedBox.length >= 8 || winner.show || finalWinner) {
            return 0;
        }

        let leftBoxes = boxes.filter((e) => {
            if (![...selectedBox, clickedBox].map((e) => e.num).includes(e.num)) {
                return e;
            }
        });

        let randomLeftBox = leftBoxes[Math.floor(Math.random() * leftBoxes.length)];

        let newBoxes = boxes;
        newBoxes[randomLeftBox.num].value = move;
        setBoxes([...newBoxes])
        setSelectedBox((prev) => [...prev, randomLeftBox])
        setTurn((turn) => turn == "X" ? "O" : "X")

        check("computer");

    }

    const handleReset = () => {
        setBoxes([{ num: 0, value: '' }, { num: 1, value: '' }, { num: 2, value: '' }, { num: 3, value: '' }, { num: 4, value: '' }, { num: 5, value: '' }, { num: 6, value: '' }, { num: 7, value: '' }, { num: 8, value: '' }]);
        setSelectedBox([]);
        setTurn("X");
        setWinner({ name: "", show: false });
        finalWinner = false;
    }

    return (
        <div className='size-full flex flex-col gap-4 justify-start items-center relative'>

            {/* NAMES OF PERSON */}
            <div className='w-full flex justify-between items-center p-2'>
                <p className='text-[14px] sm:text-[18px] w-[100px] sm:w-[150px] bg-red-500 p-2 rounded-lg capitalize text-center'>{loggedInUSER.name}</p>
                <p className='text-[14px] sm:text-[18px] w-[100px] sm:w-[150px] bg-red-500 p-2 rounded-lg capitalize text-center'>{"computer"}</p>
            </div>

            {/* 9 BOXES */}
            <div className='w-fit grid grid-rows-3 grid-cols-3 gap-4'>
                {boxes.map((e, i) => (
                    <div
                        key={i}
                        className='w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex justify-center items-center text-[40px] sm:text-[80px] transition-colors duration-500 bg-yellow-500 hover:bg-teal-500'
                        onClick={() => { handleClick(e) }}
                    >{e.value}</div>
                ))}
            </div>

            <div>TURN OF {turn}</div>
            {winner.show && <div>WINNER IS {winner.name}</div>}
            <div onClick={handleReset}>RESET</div>

        </div>
    )
}

export default Computer