import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gameIcon from '../../assets/game.svg'
import MyImage from '../../components/MyImage';
import { getRandomColor } from '../../helper/customFunction';

const Game = () => {
    const navigate = useNavigate();

    const games = [{ route: "tictactoe", name: "Tic Tac Toe" }, { route: "memory", name: 'memory' }]

    const handleNavigate = (route) => {
        route ? navigate(`/home/games/${route}`) : ""
    }
    return (
        <div className='flex flex-col gap-1'>

            <p className='text-[30px] font-bold'>Games</p>

            <div className='w-full flex flex-wrap justify-start items-start gap-2'>
                {games.map((game) => (
                    <div
                        key={game.name}
                        className={`w-full md:w-[49%] h-[250px] rounded-lg cursor-pointer flex flex-col justify-center items-center gap-2 hover:bg-bgFilterPop transition-colors duration-500 p-2`}
                        style={{ background: getRandomColor() }}>
                        <MyImage src={gameIcon} className={"w-[30px] h-[30px]"} />
                        <p
                            onClick={() => handleNavigate(game.route)}
                            className='capitalize text-[30px]'>
                            {game.name}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Game