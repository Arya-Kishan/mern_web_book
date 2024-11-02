import React, { useState } from 'react'
import tvIcon from "../../assets/tv.svg"
import multiPlayerIcon from "../../assets/multiPlayer.svg"
import Computer from '../../components/Games/TicTacToe/Computer';
import Player from '../../components/Games/TicTacToe/Player';
import settingIcon from "../../assets/setting.svg"
import MyImage from '../../components/MyImage';

const TicTac = () => {

    const [showChoose, setShowChoose] = useState({ show: true, value: "computer" });

    const handleChoose = (choosed) => {
        choosed == "computer" ? setShowChoose({ show: false, value: "computer" }) : setShowChoose({ show: false, value: "player" })
    }

    return (
        <div className='size-full flex flex-col gap-4 justify-start items-center relative'>

            <div className='w-full h-[40px] flex items-center justify-between gap-2'>
                <p className='font-semibold text-xl capitalize border-b-2 border-white'>TIC TAC TOE</p>
                <MyImage src={settingIcon} className={"w-[30px] h-[30px]"} onClick={() => setShowChoose({ show: true, value: "computer" })} />
            </div>

            <div className='w-full h-full'>
                {
                    showChoose.value == "computer"
                        ?
                        <Computer />
                        :
                        <Player />
                }
            </div>

            {
                showChoose.show
                &&
                <div className='size-full fixed md:absolute top-0 left-0 bg-bgOpacity flex justify-center items-center'>

                    <div onClick={e => e.stopPropagation()} className='w-[250px] sm:w-[400px] h-fit bg-blue-800 p-4 rounded-xl flex flex-col justify-center items-center gap-4 capitalize'>
                        {/* CHOOSE COMPUTER OR PLAYER */}
                        <div className='w-full flex justify-between gap-2 text-[14px] sm:text-[20px] text-center'>
                            <div onClick={() => handleChoose("computer")} className='w-[120px] gap-2 flex items-center rounded-lg bg-blue-600 p-2'>
                                <MyImage src={tvIcon} className={"w-[20px] h-[20px]"} />
                                <p>computer</p>
                            </div>
                            <div onClick={() => handleChoose("player")} className='w-[120px] flex items-center gap-2 rounded-lg bg-blue-600 p-2'>
                                <MyImage src={multiPlayerIcon} className={"w-[20px] h-[20px]"} />
                                <p>player</p>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </div>
    )
}

export default TicTac