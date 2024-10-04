import React, { lazy, Suspense, useState } from 'react'
import filterIcon from '../../assets/icons/filterIcon.svg'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { useGetUserInterviewQuery } from '../../Redux/Interview/InterviewApi'
import { useGetUserNotesQuery } from '../../Redux/Note/NoteApi'
import { useGetUserMcqsQuery } from '../../Redux/Mcq/McqApi'
import Error from '../../components/Error'
import { useGetUserTasksQuery } from '../../Redux/Task/TaskApi'
import Loader from '../../components/Loader'
import MyImage from '../../components/MyImage'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSingleUserQuery } from '../../Redux/User/UserApi'
const ProfileChart = lazy(() => import("./ProfileChart"))

const Profile = () => {
    const loggedInUser = useSelector(selectLoggedInUser);
    const navigate = useNavigate();
    const params = useParams();

    const { data: userDetail, isLoading: userLoading, error: erroruser, isError: userError, isSuccess: userSuccess } = useGetSingleUserQuery(params.userId);
    const { data: tasks, isLoading: tasksLoading, error: errortasks, isError: tasksError, isSuccess: tasksSuccess } = useGetUserTasksQuery(params.userId);
    const { data: notes, isLoading: notesLoading, error: errornotes, isError: notesError, isSuccess: notesSuccess } = useGetUserNotesQuery(params.userId);
    const { data: interview, isLoading: interviewLoading, error: errorinterview, isError: interviewError, isSuccess: interviewSuccess } = useGetUserInterviewQuery(params.userId);
    const { data: mcq, isLoading: mcqLoading, error: errormcq, isError: mcqError, isSuccess: mcqSuccess } = useGetUserMcqsQuery(params.userId);

    if (tasksError || notesError || mcqError || interviewError) {
        return <Error text='Erroc Occured' errorResponse={errortasks || errornotes || errormcq || errorinterview} />
    }

    const handleAdmin = () => {
        if (loggedInUser.role == "admin") {
            navigate("/admin")
        }
    }


    return (
        userLoading
            ?
            <Loader />
            :
            <div className='w-full h-full flex flex-col gap-10'>

                <div className='w-full h-fit flex justify-between relative'>

                    <div className='w-full flex gap-2 md:gap-10 items-center justify-start text-[20px] sm:text-[40px] mr-4 overflow-hidden'>
                        <div className='w-[50px] md:w-[100px] h-[50px] md:h-[100px]'><img loading="lazy" className='w-[100px]' src={`https://api.multiavatar.com/${userDetail.name}.svg`} alt="" /></div>
                        <p className='h-full flex flex-col items-start'>
                            <span>{userDetail.name}</span>
                            <span className='text-[10px] md:text-[20px]'>{userDetail.email}</span>
                        </p>
                    </div>

                    <MyImage className='w-[20px] h-[20px] md:w-[30px] md:h-[30px]' src={filterIcon} onClick={handleAdmin} alt="icon" />

                </div>

                {/* chart */}
                {
                    tasksLoading || notesLoading || mcqLoading || interviewLoading
                        ?
                        <Loader />
                        :
                        <Suspense fallback=""><ProfileChart tasks={tasks} notes={notes} interview={interview} mcq={mcq} /></Suspense>
                }

            </div>
    )
}

export default Profile