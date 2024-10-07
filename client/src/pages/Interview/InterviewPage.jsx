import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import addIcon from '../../assets/add.svg'
import InterviewCard from '../../components/cards/InterviewCard'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../Redux/Auth/AuthSlice'
import { useGetUserInterviewQuery } from '../../Redux/Interview/InterviewApi'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useGetGlobalInterviewsQuery } from '../../Redux/GlobalInterview/GlobalInterviewApi'
import Toggle from '../../components/common/Toggle'
import GlobalInterviewCard from '../../components/globalCards/GlobalInterviewCard'
import MyImage from '../../components/MyImage'

const InterviewPage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const userId = useSelector(selectUserId)
  const [result, setResult] = useState(null);
  const [global, setGlobal] = useState(false);
  const { data: interview, isLoading, error: errorData, isError, isSuccess } = useGetUserInterviewQuery(userId);
  const { data: globalinterview, isLoading: globalLoading, error: globalErrorData, isError: globalError, isSuccess: globalSuccess } = useGetGlobalInterviewsQuery("fake", { skip: !global });

  useEffect(() => {

    if (global) {
      setResult(globalinterview)
    } else {
      setResult(interview)
    }

  }, [interview, globalinterview, global])


  if (isError || globalError) {
    return <Error text='Error Occured' errorResponse={errorData || globalErrorData} />
  }

  const handleToggle = (word) => {
    word == "global" ? setGlobal(true) : setGlobal(false);
  }

  return (
    <div className='w-full h-full relative'>

      {/* heading */}
      <div className='w-full h-[37px] flex justify-between relative'>

        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>{pathname.split("/")[2]}</p>

        <div className='flex gap-1'>
          <Toggle buttonsArr={["personal", "global"]} onChange={handleToggle} />
          <MyImage onClick={() => navigate("/home/createInterview?type=create")} className='w-[60px] h-[60px] fixed bottom-20 md:bottom-[35px] right-3 md:right-[40px]' src={addIcon} alt="" />
        </div>

      </div>

      <div className='w-full h-[calc(100dvh-70px)] md:h-[calc(100dvh-125px)] overflow-scroll flex flex-wrap justify-start items-start gap-5 pt-5'>

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
            global
              ?
              result?.map((interview) => (<GlobalInterviewCard key={interview._id} interview={interview} />))
              :
              result?.map((interview) => (<InterviewCard key={interview._id} interview={interview} />))
        }

        {result && result[0]?.interviewType == "personal" && result?.length < 2 && <div onClick={() => navigate("/home/createInterview?type=create")} className='extraAdd flex flex-col gap-3 justify-evenly items-center bg-transparent w-full sm:w-[48.2%] md:w-[48%] lg:w-[31.5%] xl:w-[23%] h-[300px] p-4 rounded-lg text-3xl cursor-pointer'>
          +
        </div>}

      </div>

    </div>
  )
}

export default InterviewPage