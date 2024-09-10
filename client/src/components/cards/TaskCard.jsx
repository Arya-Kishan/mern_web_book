import React, { useState } from 'react'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import { useNavigate } from 'react-router-dom'
import DeletePopUp from '../popups/DeletePopUp'
import { getColor } from '../../helper/customFunction'

const TaskCard = ({ task }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    return (
        <div className='flex flex-col gap-3 justify-evenly items-start bg-bg-card w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg cursor-pointer'>

            <div className='w-full flex justify-between items-center'>
                <p className='font-semibold text-2xl line-clamp-1'>{task.title}</p>
                <span className={`bg-${getColor(task.condition)}-600 p-1 rounded-lg`}>{task.condition}</span>
            </div>

            <p className='line-clamp-2'>{task.description}</p>

            <div className='w-full flex gap-2 items-center justify-between'>

                <p>01/01/25</p>

                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate(`/createTask?type=update&taskId=${task._id}`)} className='w-[20px]' src={editIcon} alt="" srcSet="" />
                    <img onClick={() => setShow(true)} className='w-[20px]' src={deleteIcon} alt="" srcSet="" />
                </div>

            </div>

            {/*     DELETE POP UP */}
            {show && <DeletePopUp setShow={setShow} id={task._id} contentType='taskCard' />}

        </div>
    )
}

export default TaskCard