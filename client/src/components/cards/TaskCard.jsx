import React, { useState } from 'react'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import { useNavigate } from 'react-router-dom'
import DeletePopUp from '../popups/DeletePopUp'
import { getColor } from '../../helper/customFunction'
import dayjs from 'dayjs'
import MyImage from '../MyImage'

const TaskCard = ({ task }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    return (
        <div className='flex flex-col gap-3 justify-between items-start bg-bg-card w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg cursor-pointer relative'>

            <div className='w-full flex flex-col gap-2'>

                <div className='w-full flex justify-between items-center'>
                    <p className='font-semibold text-2xl line-clamp-1'>{task.title}</p>
                    <span className={`bg-${getColor(task.condition)}-600 px-2 py-1 text-[12px] rounded-lg`}>{task.condition}</span>
                </div>

                <p className='line-clamp-2'>{task.description}</p>

            </div>

            <div className='w-full flex gap-2 items-center justify-between'>

                <p className='text-[12px]'>{dayjs(task.createdAt).format("DD/MM/YY")}</p>

                <div className='flex items-center gap-2'>
                    <MyImage onClick={() => navigate(`/home/createTask?type=update&taskId=${task._id}`)} className={"w-[20px] h-[20px]"} src={editIcon} alt='icon' />
                    <MyImage onClick={() => setShow(true)} className={"w-[20px]"} src={deleteIcon} alt="icon" />
                </div>

            </div>

            {/* progress */}
            <div className={`absolute top-0 left-0 w-full h-[5px] ${task.condition == "completed" ? "bg-green-700" : "bg-red-700"}`} ></div>


            {/*     DELETE POP UP */}
            {show && <DeletePopUp setShow={setShow} id={task._id} contentType='taskCard' />}

        </div>
    )
}

export default TaskCard