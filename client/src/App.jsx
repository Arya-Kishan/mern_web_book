import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserWithJwtAsync, selectLoggedInUser, selectPrecheckUser, selectUserId } from './Redux/Auth/AuthSlice'
import logo from './assets/logo.svg'
import MainLandingPage from './pages/LandingPage/MainLandingPage'
import Loader from './components/Loader'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import SignUpPage from './pages/Auth/SignUpPage'
import ProtectedPage from './pages/ProtectedPage'
import NotFound from './pages/NotFound'

const HomePage = lazy(() => import("./pages/HomePage"))


function App() {

  const preCheckUser = useSelector(selectPrecheckUser);
  const loggedInUser = useSelector(selectLoggedInUser);
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch();

  // FALLBACK COMPONENT
  const FallBack = () => {
    return <div className='w-full h-dvh flex flex-col gap-8 justify-center items-center'>
      <img className='w-[100px] h-[100px]' src={logo} alt="" srcSet="" />
      <div className='w-[40px] h-[40px]'><Loader /></div>
    </div>
  }

  useEffect(() => {
    dispatch(checkUserWithJwtAsync(null))
  }, [])

  return (
    <div className='w-full h-[100dvh] bg-[#0A0A46]'>

      {preCheckUser ?
        <BrowserRouter>
          <Suspense fallback={<FallBack />}>
            <Routes>
              <Route path="/" element={<MainLandingPage />} />
              <Route path="/home" element={<Navigate to={"/home/tasks"} />} />
              <Route path="/home/*" element={<ProtectedPage><HomePage /></ProtectedPage>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        :
        <FallBack />
      }

    </div>
  )
}

export default App
