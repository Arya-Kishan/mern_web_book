import React, { lazy, Suspense, useEffect, useState } from 'react'
import chessIcon from '../../assets/chess.svg'
import { useNavigate } from 'react-router-dom';
import personalIcon from '../../assets/personal.svg'
import globeIcon from '../../assets/globe.svg'


const GlobalInterviewCard = ({ interview }) => {
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

                <img loading="lazy" onClick={(e) => { setPop(!pop) }} src={globeIcon} alt="" srcSet="" />

                {/* GLOBE POP UP FOR DELETING FROM GLOBAL */}
                {!pop ? ""
                    :
                    <p onClick={() => { setShow(!show) }} className='w-[150px] bg-bgNotePop flex items-center gap-2 absolute top-0 left-full rounded-lg p-1 overflow-hidden z-20'>
                        <img loading="lazy" src={personalIcon} alt="" srcSet="" />
                        <span>Delete From Global</span>
                    </p>
                }

            </div>

            <div className='w-full flex justify-center items-center'>
                <img loading="lazy" className='bg-white rounded-full p-2' src={chessIcon} alt="" />
            </div>

            <p className='w-full font-bold text-xl text-center line-clamp-1'>{interview?.title}</p>

            <p className='w-full text-center line-clamp-2'>{interview?.description}</p>

            <div className='w-full flex justify-center items-center'>
                <button onClick={() => navigate(`/home/interviewDetail/${interview.interviewType == "personal" ? interview._id : interview.interviewId}?title=${interview.title}`)} className='p-2 bg-btnColor1 w-[100px] rounded-sm'>Check</button>
            </div>

        </div>
    )
}

export default GlobalInterviewCard