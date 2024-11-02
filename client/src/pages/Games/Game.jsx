import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Game = () => {
    const navigate = useNavigate();

    // const games = ["TIC TAC TOE",""]

    const handleNavigate = (route) => {
        navigate(`/home/games/${route}`)
    }
    return (
        <div className='flex flex-col gap-1'>

            <p className='text-[30px] font-bold'>Games</p>

            <p
             onClick={() => handleNavigate("tic")}
             className='w-full p-2 bg-blue-600 rounded-lg cursor-pointer'>1. TIC TAC TOE </p>
        </div>
    )
}

export default Game