import React, { useState } from 'react'
import filterIcon from '../../assets/icons/filterIcon.svg'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { useGetUserInterviewQuery } from '../../Redux/Interview/InterviewApi'
import { useGetUserNotesQuery } from '../../Redux/Note/NoteApi'
import { useGetUserMcqsQuery } from '../../Redux/Mcq/McqApi'
import Error from '../../components/Error'
import { useGetUserTasksQuery } from '../../Redux/Task/TaskApi'
import Loader from '../../components/Loader'
import Toggle from '../../components/common/Toggle'
import ProfileChart from './ProfileChart'

const Profile = () => {
    const [popUp, setPopUp] = useState(false);
    const loggedInUser = useSelector(selectLoggedInUser);

    const { data: tasks, isLoading: tasksLoading, error: errortasks, isError: tasksError, isSuccess: tasksSuccess } = useGetUserTasksQuery(loggedInUser._id);
    const { data: notes, isLoading: notesLoading, error: errornotes, isError: notesError, isSuccess: notesSuccess } = useGetUserNotesQuery(loggedInUser._id);
    const { data: interview, isLoading: interviewLoading, error: errorinterview, isError: interviewError, isSuccess: interviewSuccess } = useGetUserInterviewQuery(loggedInUser._id);
    const { data: mcq, isLoading: mcqLoading, error: errormcq, isError: mcqError, isSuccess: mcqSuccess } = useGetUserMcqsQuery(loggedInUser._id);

    if (tasksError || notesError || mcqError || interviewError) {
        return <Error text='Erroc Occured' errorResponse={errortasks || errornotes || errormcq || errorinterview} />
    }


    return (
        tasksLoading || notesLoading || mcqLoading || interviewLoading
            ?
            <Loader />
            :
            <div className='w-full h-full flex flex-col gap-10'>

                <div className='w-full h-fit flex justify-between relative'>

                    <div className='w-full flex gap-2 md:gap-10 items-center justify-start text-[20px] sm:text-[40px] mr-4 overflow-hidden'>
                        <div className='w-[50px] md:w-[100px] h-[50px] md:h-[100px]'><img className='w-[100px]' src={`https://api.multiavatar.com/${loggedInUser.name}.svg`} alt="" /></div>
                        <p className='h-full flex flex-col items-start'>
                            <span>{loggedInUser.name}</span>
                            <span className='text-[10px] md:text-[20px]'>{loggedInUser.email}</span>
                        </p>
                    </div>

                    <img className='w-[20px] md:w-[30px]' onClick={(e) => { e.stopPropagation(); setPopUp(!popUp) }} src={filterIcon} alt="" srcSet="" />

                </div>

                {/* chart */}
                <ProfileChart tasks={tasks} notes={notes} interview={interview} mcq={mcq} />

            </div>
    )
}

export default Profile