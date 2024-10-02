import React from 'react'
import { useNavigate } from 'react-router-dom'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import MyImage from '../MyImage'

const TaskPage = () => {

    const navigate = useNavigate();

    return (
        <div className='w-[100vw] h-screen flex justify-center items-center bg-[#010037] text-white'>

            <div className='w-[90%] sm:w-[80%] h-[90%] sm:h-[80%] flex flex-col md:flex-row justify-evenly md:justify-center items-center  gap-10 sm:gap-20 bg-transparent sm:bg-blue-800 rounded-xl p-2 shadow-md'>

                {/* DESCCRIPTION */}
                <div className='w-full md:w-[40%] h-[200px] flex flex-col gap-4 text-[16px] '>
                    <p className='text-[35px] text-center sm:text-start'>Create Task</p>
                    <p className='h-full'>Create a new Task for yourself with a deadline via selecting date.You will be notified on selected date through email</p>
                    <button onClick={() => navigate("/login")} className='w-full sm:w-[200px] rounded-lg px-2 py-1 border-2 border-white'>Visit</button>
                </div>

                {/* CARD */}
                <div className='w-full md:w-[40%] h-[250px] sm:h-[300px] flex flex-col gap-3 justify-evenly items-start bg-bg-card p-4 rounded-lg text-[14px] shadow-lg shadow-black'>

                    <div className='w-full flex justify-between items-center'>
                        <p className='font-semibold text-[14px] sm:text-2xl line-clamp-1'>Excel Sheet</p>
                        <span className={`bg-${"completed" == "completed" ? "green" : "red"}-600 p-1 rounded-lg`}>completed</span>
                    </div>

                    <p className='line-clamp-3 sm:line-clamp-5 text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptates delectus nihil cupiditate, quas commodi inventore sapiente modi vero laboriosam quam quaerat repellat debitis odio. </p>

                    <div className='w-full flex gap-2 items-center justify-between'>

                        <p>01/01/25</p>

                        <div className='flex items-center gap-2'>
                            <MyImage className='w-[20px] h-[20px]' src={editIcon} alt="icon" />
                            <MyImage className='w-[20px] h-[20px]' src={deleteIcon} alt="icon" />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default TaskPage