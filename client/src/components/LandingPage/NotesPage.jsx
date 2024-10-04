import React from 'react'
import { useNavigate } from 'react-router-dom'
import editIcon from '../../assets/edit.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import MyImage from '../MyImage'

const NotesPage = () => {

    const navigate = useNavigate();

    return (

        <div className='w-[100vw] h-screen flex justify-center items-center'>

            <div className='w-[90%] sm:w-[80%] h-[90%] sm:h-[80%] flex flex-col md:flex-row justify-evenly md:justify-center items-center  gap-10 sm:gap-20 bg-transparent sm:bg-blue-800 rounded-xl p-2 shadow-md '>

                {/* DESCCRIPTION */}
                <div className='w-full md:w-[40%] h-[200px] flex flex-col gap-4 text-[16px] p-2'>
                    <p className='text-[35px] text-center sm:text-start text-customGreen'>Create Note</p>
                    <p className='h-full'>Create a new Note of any subject or topic and save it in cloud. Edit and delete whenever you need</p>
                    <button onClick={() => navigate("/login")} className='w-full sm:w-[200px] rounded-lg px-2 py-1 border-2 border-white'>Visit</button>
                </div>

                {/* CARD */}
                <div onClick={() => navigate("/login")} className='w-full md:w-[40%] h-[250px] sm:h-[300px] flex flex-col gap-3 justify-evenly items-start bg-bg-card p-4 rounded-lg text-[14px] shadow-md shadow-white'>


                    <div className='w-full flex justify-between relative'>
                        <p className='font-semibold text-[14px] sm:text-2xl line-clamp-1'>Interview Notes</p>
                        <MyImage className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]' src={threeDotIcon} alt="" />
                    </div>

                    <p className='line-clamp-3 sm:line-clamp-5 text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptates delectus nihil cupiditate, quas commodi inventore sapiente modi vero laboriosam quam quaerat repellat debitis odio. </p>

                    <div className='w-full flex gap-2 items-center justify-between pt-1 sm:pt-[40px]'>

                        <p>01/01/25</p>

                        <MyImage className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] bg-[#0A0A46] p-1 sm:p-[6px] rounded-full' src={editIcon} alt="" />


                    </div>

                </div>

            </div>
        </div>

    )
}

export default NotesPage