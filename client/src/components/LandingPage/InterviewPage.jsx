import React from 'react'
import { useNavigate } from 'react-router-dom'
import chessIcon from '../../assets/chess.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import MyImage from '../MyImage'

const InterviewPage = () => {

    const navigate = useNavigate();

    return (
        <div className='w-[100vw] h-screen flex justify-center items-center'>

            <div className='w-[90%] sm:w-[80%] h-[90%] sm:h-[80%] flex flex-col md:flex-row justify-evenly md:justify-center items-center  gap-10 sm:gap-20 bg-transparent sm:bg-blue-800 rounded-xl p-2 shadow-md'>

                {/* DESCCRIPTION */}
                <div className='w-full md:w-[40%] h-[200px] flex flex-col gap-4 text-[16px] '>
                    <p className='text-[35px] text-center sm:text-start'>Create Interview</p>
                    <p className='h-full'>Create a new Interview Directory containing lots of questions answer's  also link any youtube or website url to the particular question for your preferences. </p>
                    <button onClick={() => navigate("/login")} className='w-full sm:w-[200px] rounded-lg px-2 py-1 border-2 border-white'>Visit</button>
                </div>

                {/* CARD */}
                <div className='w-full md:w-[40%] h-[250px] sm:h-[300px] flex flex-col gap-3 justify-evenly items-start bg-bg-card p-4 rounded-lg text-[14px] shadow-lg shadow-black'>

                    <div className='w-full flex justify-end items-center relative'>

                        <MyImage className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]' src={threeDotIcon} alt="icon" />

                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <MyImage className='w-[45px] h-[45px] bg-white rounded-full p-2' src={chessIcon} alt="icon" />
                    </div>

                    <p className='w-full font-bold text-xl text-center line-clamp-1 hidden sm:block'>Interview questions</p>

                    <p className='line-clamp-3 sm:line-clamp-5 text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptates delectus nihil cupiditate, quas commodi inventore sapiente modi vero laboriosam quam quaerat repellat debitis odio. </p>

                    <div className='w-full flex justify-center items-center'>
                        <button className='p-2 bg-btnColor1 w-[100px] rounded-lg text-[12px] sm:text-xl'>Interview</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default InterviewPage