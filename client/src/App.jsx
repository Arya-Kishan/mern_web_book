import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserWithJwtAsync, selectLoggedInUser, selectPrecheckUser, selectUserId } from './Redux/Auth/AuthSlice'
import logo from './assets/logo.svg'
import MainLandingPage from './pages/LandingPage/MainLandingPage'
import Loader from './components/Loader'
import { timer } from './helper/customFunction'

const HomePage = lazy(() => import("./pages/HomePage"))


function App() {

  const preCheckUser = useSelector(selectPrecheckUser);
  const loggedInUser = useSelector(selectLoggedInUser);
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch();
  console.log("userId : " + userId);
  console.log("loggedInUSER : " + loggedInUser);

  // FALLBACK COMPONENT
  const FallBack = () => {
    return <div className='w-full h-dvh flex flex-col gap-8 justify-center items-center'>
      <img className='w-[100px] h-[100px]' src={logo} alt="" srcSet="" />
      <div className='w-[40px] h-[40px]'><Loader /></div>
    </div>
  }

  useEffect(() => {
    dispatch(checkUserWithJwtAsync(null))
    timer()
  }, [])

  return (
    <div className='w-full h-[100dvh] bg-[#0A0A46]'>

      {<Suspense fallback={<FallBack />}>
        {preCheckUser
          ?
          loggedInUser
            ?
            <HomePage />
            :
            <MainLandingPage />
          :
          <FallBack />
        }
      </Suspense>}

    </div>
  )
}

export default App
