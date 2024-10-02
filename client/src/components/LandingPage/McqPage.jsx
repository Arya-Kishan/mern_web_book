import React from 'react'
import { useNavigate } from 'react-router-dom'
import puzzleIcon from '../../assets/puzzle.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import MyImage from '../MyImage'
const McqPage = () => {

    const navigate = useNavigate();

    return (
        <div className='w-[100vw] h-screen flex justify-center items-center bg-[#010037]'>

            <div className='w-[90%] sm:w-[80%] h-[90%] sm:h-[80%] flex flex-col md:flex-row justify-evenly md:justify-center items-center  gap-10 sm:gap-20 bg-transparent sm:bg-blue-800 rounded-xl p-2 shadow-md'>

                {/* DESCCRIPTION */}
                <div className='w-full md:w-[40%] h-[200px] flex flex-col gap-4 text-[16px] '>
                    <p className='text-[35px] text-center sm:text-start'>Create Mcq</p>
                    <p className='h-full'>Make a new Mcq directory today and practice your mcq's later.You can even register your mcq gloabally so anyone can check your mcq and participate.</p>
                    <button onClick={() => navigate("/login")} className='w-full sm:w-[200px] rounded-lg px-2 py-1 border-2 border-white'>Visit</button>
                </div>

                {/* card */}
                <div className='w-full md:w-[40%] h-[250px] sm:h-[300px] flex flex-col gap-3 justify-evenly items-start bg-bg-card p-4 rounded-lg text-[14px] shadow-lg shadow-black'>

                    <div className='w-full flex gap-2 items-center justify-between relative'>

                        <div className='flex items-center gap-2'>
                            <MyImage className={"w-[30px] h-[30px]"} src={puzzleIcon} alt="" />
                            <p className='line-clamp-1'>Practice Mcq's</p>
                        </div>

                        <MyImage className={"w-[30px] h-[30px]"} src={threeDotIcon} alt="" />

                    </div>

                    <p className='line-clamp-3 sm:line-clamp-5 text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptates delectus nihil cupiditate, quas commodi inventore sapiente modi vero laboriosam quam quaerat repellat debitis odio. </p>

                    <div className='w-full flex justify-start items-center'>
                        <button className='w-[100px] text-textColor4 font-semibold bg-bgBtn1 p-2 rounded-lg'>Check Mcq</button>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default McqPage