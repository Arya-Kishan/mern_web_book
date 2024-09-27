import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import chessIcon from '../../assets/chess.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import globeIcon from '../../assets/globe.svg'

import ThreeDotPopUp from '../popups/ThreeDotPopUp';
import MyImage from '../MyImage';
const DeletePopUp = lazy(() => import("../popups/DeletePopUp"))


const InterviewCard = ({ interview }) => {
    const navigate = useNavigate();
    const [pop, setPop] = useState(false);
    const [show, setShow] = useState(false);

    const handlePop = () => {
        setPop(false)
    }

    // adding event listener to window whenver click outside pop up get closed
    useEffect(() => {
        window.addEventListener("click", handlePop)

        return () => {
            window.removeEventListener("click", handlePop)
        }

    }, [])

    return (
        <div className='flex flex-col gap-3 justify-evenly items-start bg-bg-card w-full sm:w-[48.2%] md:w-[48%] lg:w-[31.5%] xl:w-[23%] h-[300px] p-4 rounded-lg cursor-pointer'>

            <div onClick={e => e.stopPropagation()} className='w-full flex justify-end items-center relative'>

                <MyImage src={interview.interviewType == "personal" ? threeDotIcon : globeIcon} onClick={(e) => { setPop(!pop) }} className={"w-[30px] h-[30px]"} />

                {/* THREE DOT POP UP */}
                {!pop ? ""
                    :
                    <ThreeDotPopUp setPop={setPop} id={interview?._id} contentType={"interviewCard"} content={interview} />
                }

            </div>

            <div className='w-full flex justify-center items-center'>
                <MyImage src={chessIcon} className={"w-[45px] h-[45px] bg-white rounded-full p-2"} />
            </div>

            <p className='w-full font-bold text-xl text-center line-clamp-1'>{interview?.title}</p>

            <p className='w-full text-center line-clamp-2'>{interview?.description}</p>

            <div className='w-full flex justify-center items-center'>
                <button onClick={() => navigate(`/home/interviewDetail/${interview.interviewType == "personal" ? interview._id : interview.interviewId}?title=${interview.title}`)} className='p-2 bg-btnColor1 w-[100px] rounded-sm'>Check</button>
            </div>

            <Suspense fallback="">
                {show && <DeletePopUp setShow={setShow} id={interview._id} setPop={setPop} contentType='globalInterview' />}
            </Suspense>


        </div>
    )
}

export default InterviewCard