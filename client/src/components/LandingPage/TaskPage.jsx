import React from 'react'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'

const TaskPage = () => {
    const tasks = [
        {
            title: "Create Task",
            condition: "completed",
            description: "Create a new Task for yourself with deadline",
        },
        {
            title: "Buy a Cup",
            condition: "incompleted",
            description: "Need to buy a cup from Sarojini Market",
        },
        {
            title: "Business Meeting",
            condition: "completed",
            description: "Meeting at 1AM and it's important",
        },
        {
            title: "Party at 5PM",
            condition: "incompleted",
            description: "Birthday Party at Johnny House",
        },
    ]
    return (
        <div className='w-[100vw] h-screen flex justify-center items-center bg-[#010037] text-white'>

            <div className='w-[80%] h-[80%] flex flex-wrap justify-center items-center gap-5 bg-blue-800 rounded-xl p-2 shadow-md shadow-white'>
                {
                    tasks.map((task,i) => (
                        <div key={i} className='flex flex-col gap-3 justify-evenly items-start bg-bg-card w-full sm:w-[45%] h-[20%] sm:h-[190px] p-4 rounded-lg text-[14px]'>

                            <div className='w-full flex justify-between items-center'>
                                <p className='font-semibold text-[14px] sm:text-2xl line-clamp-1'>{task.title}</p>
                                <span className={`bg-${task.condition == "completed" ? "green" : "red"}-600 p-1 rounded-lg`}>{task.condition}</span>
                            </div>

                            <p className='line-clamp-2 text-[10px] sm:text-1xl hidden sm:block'>{task.description}</p>

                            <div className='w-full flex gap-2 items-center justify-between'>

                                <p>01/01/25</p>

                                <div className='flex items-center gap-2'>
                                    <img loading="lazy" className='w-[20px]' src={editIcon} alt="" srcSet="" />
                                    <img loading="lazy" className='w-[20px]' src={deleteIcon} alt="" srcSet="" />
                                </div>

                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default TaskPage