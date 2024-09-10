import React from 'react'
import NoteCard from '../../components/cards/NoteCard'
import { useLocation, useNavigate } from 'react-router-dom'
import addIcon from '../../assets/add.svg'
import Loader from '../../components/Loader'
import { useGetUserNotesQuery } from '../../Redux/Note/NoteApi'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../Redux/Auth/AuthSlice'
import Error from '../../components/Error'


const NotePage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const userId = useSelector(selectUserId)
  const { data: notes, isLoading, isError } = useGetUserNotesQuery(userId);

  if (isError) {
    return <Error />
  }

  return (
    <div className='w-full h-full'>

      {/* heading */}
      <div className='w-full h-[32px] flex justify-between'>
        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>{pathname.slice(1)}</p>
        <img onClick={() => navigate("/createNote?type=create")} src={addIcon} alt="" srcSet="" />
      </div>

      <div className='w-full h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex gap-5 flex-wrap justify-start items-start pt-5'>

        {isLoading
          ?
          <Loader />
          :
          notes?.length < 0
            ?
            <div className='w-full h-full flex justify-center items-center'>NO NOTES</div>
            :
            notes?.map((note) => (<NoteCard key={note._id} note={note} />))
        }

        {notes?.length < 2 && <div onClick={() => navigate("/createNote?type=create")} className='extraAdd flex flex-col gap-3 justify-evenly items-center bg-transparent w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg text-3xl'>
          +
        </div>}

      </div>

    </div>
  )
}

export default NotePage