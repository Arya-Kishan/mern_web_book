import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import addIcon from '../../assets/add.svg'
import McqCard from '../../components/cards/McqCard'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../Redux/Auth/AuthSlice'
import { useGetUserMcqsQuery } from '../../Redux/Mcq/McqApi'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useGetGlobalMcqsQuery } from '../../Redux/GlobalMcq/GlobalMcqApi'
import Toggle from '../../components/common/Toggle'
import GlobalMcqCard from '../../components/globalCards/GlobalMcqCard'
import MyImage from '../../components/MyImage'

const McqPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [result, setResult] = useState(null);
  const [global, setGlobal] = useState(false);
  const { data: mcq, isLoading, error: errorData, isError, isSuccess } = useGetUserMcqsQuery(userId);
  const { data: globalMcq, isLoading: globalLoading, error: globalErrorData, isError: globalError, isSuccess: globalSuccess } = useGetGlobalMcqsQuery("fake", { skip: !global });

  useEffect(() => {

    if (global) {
      setResult(globalMcq)
    } else {
      setResult(mcq)
    }

  }, [mcq, globalMcq, global])

  const handleToggle = (word) => {
    word == "global" ? setGlobal(true) : setGlobal(false);
  }

  if (isError || globalError) {
    return <Error text='Error Occured' errorResponse={errorData || globalErrorData} />
  }

  return (
    <div className='w-full h-full relative'>

      {/* heading */}
      <div className='w-full h-[37px] flex justify-between relative'>
        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>{pathname.split("/")[2]}</p>

        <div className='flex gap-1'>
          <Toggle buttonsArr={["personal", "global"]} onChange={handleToggle} />
          <MyImage onClick={() => navigate("/home/createMcq?type=create")} className='w-[60px] h-[60px] fixed bottom-20 md:bottom-[35px] right-3 md:right-[40px]' src={addIcon} alt="" />
        </div>

      </div>

      <div className='w-full h-[calc(100dvh-70px)] md:h-[calc(100dvh-125px)] overflow-scroll flex flex-col md:flex-row justify-start items-start pt-5 gap-5'>

        {isLoading || globalLoading
          ?
          <Loader />
          :
          result?.length < 1
            ?
            <div className='w-full h-full flex justify-center items-center'>
              <span>NO MCQ - </span>
              <span onClick={() => navigate("/home/createMcq?type=create")} className='ml-2 font-bold'> ADD </span>
            </div>
            :
            global
              ?
              result?.map((mcq) => (<GlobalMcqCard key={mcq._id} mcq={mcq} />))
              :
              result?.map((mcq) => (<McqCard key={mcq._id} mcq={mcq} />))
        }

        {result && result[0]?.mcqType == "personal" && result?.length < 2 && <div onClick={() => navigate("/home/createMcq?type=create")} className='extraAdd flex flex-col gap-3 justify-evenly items-center bg-transparent w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg text-3xl cursor-pointer'>
          +
        </div>}

      </div>

    </div>
  )
}

export default McqPage