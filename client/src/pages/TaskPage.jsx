import React from 'react'
import TaskCard from '../components/cards/TaskCard'
import { useLocation, useNavigate } from 'react-router-dom'
import addIcon from '../assets/add.svg'
import Loader from '../components/Loader'
import { useGetUserTasksQuery } from '../Redux/Task/TaskApi'
import Error from '../components/Error'
import { useSelector } from 'react-redux'
import { selectUserId } from '../Redux/Auth/AuthSlice'
import MyImage from '../components/MyImage'

const TaskPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  const { data: tasks, isLoading, isError, error } = useGetUserTasksQuery(userId);


  if (isError) {
    return <Error text='Erroc Occured' errorResponse={error} />
  }

  return (
    <div className='w-full h-full'>

      {/* heading */}
      <div className='w-full h-[32px] flex justify-between'>
        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>{pathname.split("/")[2]}</p>
        <MyImage className={"w-[32px] h-[32px]"} onClick={() => navigate("/home/createTask?type=create")} src={addIcon} alt="" />
      </div>

      {isLoading
        ?
        <Loader />
        :
        <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-5 pt-5'>

          {tasks?.length > 0
            ?
            tasks.map((task) => (<TaskCard key={task._id} task={task} />))
            :
            ""
          }

          {tasks?.length < 2 && <div onClick={() => navigate("/home/createTask?type=create")} className='extraAdd flex flex-col gap-3 justify-evenly items-center bg-transparent w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg text-3xl cursor-pointer'>
            +
          </div>}

        </div>
      }

    </div>
  )
}

export default TaskPage