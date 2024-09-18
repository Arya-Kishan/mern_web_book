import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import addIcon from '../../assets/add.svg'
import globeIcon from '../../assets/globe.svg'
import filterIcon from '../../assets/icons/filterIcon.svg'
import personalIcon from '../../assets/personal.svg'
import InterviewCard from '../../components/cards/InterviewCard'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../Redux/Auth/AuthSlice'
import { useGetUserInterviewQuery } from '../../Redux/Interview/InterviewApi'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useGetGlobalInterviewsQuery } from '../../Redux/GlobalInterview/GlobalInterviewApi'

const InterviewPage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const userId = useSelector(selectUserId)
  const [popUp, setPopUp] = useState(false);
  const [result, setResult] = useState(null);
  const [global, setGlobal] = useState(false);
  const { data: interview, isLoading, isError, isSuccess } = useGetUserInterviewQuery(userId);
  const { data: globalinterview, isLoading: globalLoading, isError: globalError, isSuccess: globalSuccess } = useGetGlobalInterviewsQuery("fake", { skip: !global });

  useEffect(() => {

    if (global) {
      setResult(globalinterview)
      setPopUp(false)
    } else {
      setResult(interview)
      setPopUp(false)
    }

  }, [interview, globalinterview, global])


  if (isError || globalError) {
    toast("Error occur while fetching - INTERVIEW")
    return <Error />
  }

  const handlePop = () => {
    setPopUp(false)
  }

  // adding event listener to window whenver click outside pop up get closed
  useEffect(() => {
    window.addEventListener("click", handlePop)

    return () => {
      window.removeEventListener("click", handlePop)
    }

  }, [])

  return (
    <div className='w-full h-full'>

      {/* heading */}
      <div className='w-full h-[32px] flex justify-between relative'>

        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>{pathname.slice(1)}</p>
        <img onClick={(e) => { e.stopPropagation(); setPopUp(!popUp) }} src={filterIcon} alt="" srcSet="" />

        {popUp && <div className='w-[200px] flex flex-col absolute top-6 right-6 bg-bgFilterPop rounded-lg overflow-hidden'>
          <p onClick={() => setGlobal(true)} className='w-full flex gap-2 p-1 text-[16px] cursor-pointer'><img className='w-[20px] sm:w-[30px]' src={globeIcon} alt="" srcSet="" />Global Interview</p>
          <p onClick={() => setGlobal(false)} className='w-full flex gap-2 p-1 text-[16px] cursor-pointer'><img className='w-[20px] sm:w-[30px]' src={personalIcon} alt="" srcSet="" />Personal Interview</p>
          <p onClick={() => navigate("/home/createInterview?type=create")} className='w-full flex gap-2 p-1 text-[16px] cursor-pointer'><img className='w-[20px] sm:w-[30px]' src={addIcon} alt="" srcSet="" />Add</p>
        </div>}

      </div>

      <div className='w-full h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-5 pt-5'>

        {isLoading || globalLoading
          ?
          <Loader />
          :
          result?.length < 1
            ?
            <div className='w-full h-full flex justify-center items-center'>
              <span>NO INTERVIEW - </span>
              <span onClick={() => navigate("/home/createInterview?type=create")} className='ml-2 font-bold'> ADD </span>
            </div>

            :
            result?.map((interview) => (<InterviewCard key={interview._id} interview={interview} />))
        }

        {result && result[0]?.interviewType == "personal" && result?.length < 2 && <div onClick={() => navigate("/home/createInterview?type=create")} className='extraAdd flex flex-col gap-3 justify-evenly items-center bg-transparent w-[300px] h-[200px] p-4 rounded-lg text-3xl'>
          +
        </div>}

      </div>

    </div>
  )
}

export default InterviewPage