import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { logoutUser, selectLoggedInUser } from '../Redux/Auth/AuthSlice'


import Loader from '../components/Loader'
import ProtectedPage from '../pages/ProtectedPage'
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"))
const SignUpPage = lazy(() => import("../pages/Auth/SignUpPage"))

import doubtIcon from '../assets/icons/doubtIcon.svg'
import mcqIcon from '../assets/icons/mcqIcon.svg'
import noteIcon from '../assets/icons/noteIcon.svg'
import qnaIcon from '../assets/icons/qnaIcon.svg'
import taskIcon from '../assets/icons/taskIcon.svg'
import hamIcon from '../assets/ham.svg'
import cancelIcon from '../assets/cancel.svg'
import logoutIcon from '../assets/logout.svg'
import { useDispatch, useSelector } from 'react-redux';

const TaskPage = lazy(() => import("../pages/TaskPage"))
const NotePage = lazy(() => import("../pages/Note/NotePage"))
const DoubtPage = lazy(() => import("../pages/Search/DoubtPage"))

const CreateNote = lazy(() => import("../pages/CreateCards/CreateNote"))
const CreateTask = lazy(() => import("../pages/CreateCards/CreateTask"))
const CreateMcq = lazy(() => import("../pages/CreateCards/CreateMcq"))


const NoteDetailPage = lazy(() => import("../pages/Note/NoteDetailPage"))
const McqDetailPage = lazy(() => import("../pages/Mcq/McqDetailPage"))
const CreateInterview = lazy(() => import("../pages/CreateCards/CreateInterview"))
const InterviewPage = lazy(() => import("../pages/Interview/InterviewPage"))
const McqPage = lazy(() => import("../pages/Mcq/McqPage"))
const InterviewDetailPage = lazy(() => import("../pages/Interview/InterviewDetailPage"))

const HomePage = () => {


  const [slide, setSlide] = useState(true);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser)

  const navList = [{ name: 'tasks', pic: taskIcon }, { name: 'notes', pic: noteIcon }, { name: 'interview', pic: qnaIcon }, { name: 'mcq', pic: mcqIcon }, { name: 'doubt', pic: doubtIcon }]

  const handleLogout = () => {
    localStorage.setItem("slide", "notLogged");
    localStorage.setItem("jwtToken", null);
    dispatch(logoutUser());
  }

  return (
    <div>

      <BrowserRouter>

        <div className='w-full h-dvh flex gap-5 bg-[#0A0A46] p-0 md:p-6 text-white'>

          {/* LEFT SIDE */}
          <div className={`shadow fixed top-0 ${slide ? "-left-full" : "-left-0"} w-[180px] bg-bgBackground md:static md:w-[20%] h-full flex flex-col justify-between items-center gap-2 py-4 rounded-none md:rounded-[20px] transition-all z-50`}>

            {/* profile */}
            <div className='w-full flex gap-2 items-center justify-center text-[25px] sm:text-[18px] mr-4 overflow-hidden'>
              <img className='w-[30px]' src={`https://api.multiavatar.com/${loggedInUser.name}.svg`} alt="" />
              <p>{loggedInUser.name}</p>
            </div>

            {/* navlinks */}
            <div className='w-full h-fit flex flex-col gap-5 capitalize text-center'>
              {navList.map((word, i) => <Link onClick={() => setSlide(!slide)} key={i} to={`/${word.name}`} className='flex gap-4 items-center justify-start pl-5 hover:bg-blue-800 p-2'>
                <img className='w-[25px]' src={word.pic} alt="" srcSet="" />
                <p className='tracking-wider text-[22px] sm:text-[18px]'>{word.name}</p>
              </Link>)}
            </div>

            {/* THEME : TOGGLE DARK AND LIGHT*/}
            <div onClick={handleLogout} className='w-full flex gap-2 justify-center items-center cursor-pointer'>
              <img src={logoutIcon} alt="" srcSet="" />
              <p>Logout</p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className='shadow w-full md:w-[80%] h-full overflow-hidden rounded-none md:rounded-[20px]'>

            {/* SHOWING CARDS */}
            <div className='w-full h-dvh md:h-[calc(100dvh-48px)] p-5 overflow-scroll'>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<ProtectedPage> <Navigate to={"/tasks"} /> </ProtectedPage>} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />

                  <Route path="/tasks" element={<ProtectedPage> <TaskPage /> </ProtectedPage>} />
                  <Route path="/notes" element={<ProtectedPage> <NotePage /> </ProtectedPage>} />
                  <Route path="/interview" element={<ProtectedPage> <InterviewPage /> </ProtectedPage>} />
                  <Route path="/mcq" element={<ProtectedPage> <McqPage /> </ProtectedPage>} />
                  <Route path="/doubt" element={<ProtectedPage> <DoubtPage /> </ProtectedPage>} />

                  <Route path="/interviewDetail/:interviewId" element={<ProtectedPage> <InterviewDetailPage /> </ProtectedPage>} />
                  <Route path="/noteDetail/:noteId" element={<ProtectedPage> <NoteDetailPage /> </ProtectedPage>} />
                  <Route path="/mcqDetail/:mcqId" element={<ProtectedPage> <McqDetailPage /> </ProtectedPage>} />

                  <Route path="/createNote" element={<ProtectedPage> <CreateNote /> </ProtectedPage>} />
                  <Route path="/createTask" element={<ProtectedPage> <CreateTask /> </ProtectedPage>} />
                  <Route path="/createInterview" element={<ProtectedPage> <CreateInterview /> </ProtectedPage>} />
                  <Route path="/createMcq" element={<ProtectedPage> <CreateMcq /> </ProtectedPage>} />

                </Routes>
              </Suspense>
            </div>

          </div>

        </div>

      </BrowserRouter>

      <img onClick={() => setSlide(!slide)} src={!slide ? cancelIcon : hamIcon} className='fixed bottom-5 right-2 block md:hidden w-[60px] h-[60px] ' alt="" srcSet="" />


    </div >
  )
}

export default HomePage