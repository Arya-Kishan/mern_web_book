import React, { lazy, Suspense } from 'react'
import Loader from '../../components/Loader'
import { Route, Routes } from 'react-router-dom'
import ProtectedPage from '../ProtectedPage'
import Error from '../../components/Error'
import CreatePost from '../CreateCards/CreatePost'
import MyChats from '../Chat/MyChats'
import Game from '../Games/Game'
import TicTac from '../Games/TicTac'

const Feed = lazy(() => import("../../pages/Feed/Feed"))
const NotFound = lazy(() => import("../NotFound"))
const TaskPage = lazy(() => import("../../pages/TaskPage"))
const NotePage = lazy(() => import("../../pages/Note/NotePage"))
const DoubtPage = lazy(() => import("../../pages/Search/DoubtPage"))
const Notification = lazy(() => import("../../pages/Notifications/Notification"))

const CreateNote = lazy(() => import("../../pages/CreateCards/CreateNote"))
const CreateTask = lazy(() => import("../../pages/CreateCards/CreateTask"))
const CreateMcq = lazy(() => import("../../pages/CreateCards/CreateMcq"))

const NoteDetailPage = lazy(() => import("../../pages/Note/NoteDetailPage"))
const Chat = lazy(() => import("../../pages/Chat/Chat"))
const McqDetailPage = lazy(() => import("../../pages/Mcq/McqDetailPage"))
const CreateInterview = lazy(() => import("../../pages/CreateCards/CreateInterview"))
const InterviewPage = lazy(() => import("../../pages/Interview/InterviewPage"))
const McqPage = lazy(() => import("../../pages/Mcq/McqPage"))
const InterviewDetailPage = lazy(() => import("../../pages/Interview/InterviewDetailPage"))
const Profile = lazy(() => import("../Profile/Profile"))

const SinglePost = lazy(() => import("../../pages/LinkSearchCategory/SinglePost"))
const SingleGlobalMcq = lazy(() => import("../../pages/LinkSearchCategory/SingleGlobalMcq"))
const SingleGlobalInterview = lazy(() => import("../../pages/LinkSearchCategory/SingleGlobalInterview"))

const RightHome = ({ }) => {
    return (
        <div className='shadow w-full md:w-[80%] h-full overflow-hidden rounded-none md:rounded-[20px]'>
            <div className='w-full h-dvh md:h-[calc(100dvh-48px)] p-5 overflow-scroll'>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/feed" element={<ProtectedPage> <Feed /> </ProtectedPage>} />
                        <Route path="/tasks" element={<ProtectedPage> <TaskPage /> </ProtectedPage>} />
                        <Route path="/notes" element={<ProtectedPage> <NotePage /> </ProtectedPage>} />
                        <Route path="/interview" element={<ProtectedPage> <InterviewPage /> </ProtectedPage>} />
                        <Route path="/mcq" element={<ProtectedPage> <McqPage /> </ProtectedPage>} />
                        <Route path="/doubt" element={<ProtectedPage> <DoubtPage /> </ProtectedPage>} />
                        <Route path="/bell" element={<ProtectedPage> <Notification /> </ProtectedPage>} />
                        <Route path="/chat/:userId" element={<ProtectedPage> <Chat /> </ProtectedPage>} />
                        <Route path="/mychats" element={<ProtectedPage> <MyChats /> </ProtectedPage>} />

                        <Route path="/games" element={<ProtectedPage> <Game /> </ProtectedPage>} />
                        <Route path="/games/tic" element={<ProtectedPage> <TicTac /> </ProtectedPage>} />

                        <Route path="/interviewDetail/:interviewId" element={<ProtectedPage> <InterviewDetailPage /> </ProtectedPage>} />
                        <Route path="/noteDetail/:noteId" element={<ProtectedPage> <NoteDetailPage /> </ProtectedPage>} />
                        <Route path="/mcqDetail/:mcqId" element={<ProtectedPage> <McqDetailPage /> </ProtectedPage>} />

                        <Route path="/link/post/:postId" element={<ProtectedPage> <SinglePost /> </ProtectedPage>} />
                        <Route path="/link/mcq/:mcqId" element={<ProtectedPage> <SingleGlobalMcq /> </ProtectedPage>} />
                        <Route path="/link/interview/:interviewId" element={<ProtectedPage> <SingleGlobalInterview /> </ProtectedPage>} />

                        <Route path="/createNote" element={<ProtectedPage> <CreateNote /> </ProtectedPage>} />
                        <Route path="/createTask" element={<ProtectedPage> <CreateTask /> </ProtectedPage>} />
                        <Route path="/createInterview" element={<ProtectedPage> <CreateInterview /> </ProtectedPage>} />
                        <Route path="/createMcq" element={<ProtectedPage> <CreateMcq /> </ProtectedPage>} />
                        <Route path="/createPost" element={<ProtectedPage> <CreatePost /> </ProtectedPage>} />
                        <Route path="/profile/:userId" element={<ProtectedPage> <Profile /> </ProtectedPage>} />
                        <Route path="/error" element={<ProtectedPage> <Error /> </ProtectedPage>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>

        </div>
    )
}

export default RightHome