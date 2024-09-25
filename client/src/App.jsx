import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserWithJwtAsync, selectPrecheckUser } from './Redux/Auth/AuthSlice'
import logo from './assets/logo.svg'
const MainLandingPage = lazy(() => import("./pages/LandingPage/MainLandingPage"))
import Loader from './components/Loader'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const LoginPage = lazy(() => import("./pages/Auth/LoginPage"))
const SignUpPage = lazy(() => import("./pages/Auth/SignUpPage"))
const ProtectedPage = lazy(() => import("./pages/ProtectedPage"))
const NotFound = lazy(() => import("./pages/NotFound"))
const RequestLimit = lazy(() => import("./pages/RequestLimit"))

const HomePage = lazy(() => import("./pages/HomePage"))


function App() {

  const preCheckUser = useSelector(selectPrecheckUser);
  const dispatch = useDispatch();

  // FALLBACK COMPONENT
  const FallBack = () => {
    return <div className='w-full h-dvh flex flex-col gap-8 justify-center items-center'>
      <img loading="lazy" className='w-[100px] h-[100px]' src={logo} alt="" srcSet="" />
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
              <Route path="/requestLimit" element={<RequestLimit />} />
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
