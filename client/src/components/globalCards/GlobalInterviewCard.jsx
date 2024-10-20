import React, { lazy, Suspense, useEffect, useState } from 'react'
import chessIcon from '../../assets/chess.svg'
import personalIcon from '../../assets/personal.svg'
import eyeIcon from '../../assets/icons/eyeIcon.svg'
import globeIcon from '../../assets/globe.svg'
import { useNavigate } from 'react-router-dom';
import DeletePopUp from '../popups/DeletePopUp';
import LikeDislikeButton from './LikeDislikeButton';
import MyImage from '../MyImage'
import UserHeading from '../UserHeading'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../Redux/Auth/AuthSlice'
import Comment from '../comments/Comment'
import SharePopUp from '../popups/SharePopUp'


const GlobalInterviewCard = ({ interview }) => {
    const navigate = useNavigate();
    const userId = useSelector(selectUserId)
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

    const handleComment = () => { }


    return (
        <div className='flex flex-col gap-3 justify-between items-center bg-bg-card w-full sm:w-[48.2%] md:w-[48%] lg:w-[31.5%] xl:w-[23%] h-[330px] rounded-lg cursor-pointer overflow-hidden'>


            <div className='w-full h-[50px] flex gap-2 items-center bg-bgFilterPop p-2'>
                <UserHeading userId={interview.userId._id} name={interview.userId.name} />

                <div onClick={e => e.stopPropagation()} className='w-full flex justify-end items-center gap-2 relative'>

                    {interview.userId._id == userId &&
                        <MyImage onClick={(e) => { setPop(!pop) }} className={"w-[22px] h-[22px]"} src={globeIcon} alt="icon" />
                    }
                    <SharePopUp link={`/home/link/interview/${interview.userId._id}`} />

                    {/* GLOBE POP UP FOR DELETING FROM GLOBAL */}
                    {!pop ? ""
                        :
                        <div onClick={() => { setShow(!show) }} className='w-[200px] bg-bgNotePop flex items-center gap-2 absolute top-[30px] right-[10px] rounded-lg p-1 overflow-hidden z-20'>
                            <MyImage src={personalIcon} className={"w-[28px] h-[24px]"} alt="icon" />
                            <span>Delete From Global</span>
                        </div>
                    }

                </div>

            </div>

            <div className='w-full flex flex-col gap-3 justify-evenly items-start px-2'>

                <div className='w-full flex justify-center items-center'>
                    <MyImage className={"w-[45px] h-[45px] bg-white rounded-full p-2"} src={chessIcon} alt="icon" />
                </div>

                <p className='w-full font-bold text-xl text-center line-clamp-1'>{interview?.title}</p>

                <p className='w-full text-center line-clamp-2'>{interview?.description}</p>

                <div className='w-full flex justify-center items-center'>
                    <button onClick={() => navigate(`/home/interviewDetail/${interview.interviewType == "personal" ? interview.userId._id : interview.interviewId}?title=${interview.title}`)} className='p-2 bg-btnColor1 w-[100px] rounded-sm'>Check</button>
                </div>


            </div>

            <div className='w-full h-[50px] flex justify-evenly gap-1'>
                {/* views */}
                <div className='w-full flex flex-col items-center gap-1 text-center'>
                    <MyImage className='w-[20px] h-[20px]' src={eyeIcon} alt="icon" />
                    <p>{interview?.views}</p>
                </div>
                {/* likes */}
                <div className='w-full flex flex-col gap-1 text-center justify-center items-center'>
                    <LikeDislikeButton data={interview} category="interview" likedArr={interview.likes} />
                </div>
                {/* comments */}
                <div className='w-full flex flex-col items-center gap-1 text-center'>
                    <Comment details={interview} category='globalInterview' />
                    <p>{interview?.comments?.length}</p>
                </div>

            </div>

            <Suspense fallback="">
                {show && <DeletePopUp setShow={setShow} id={interview.userId._id} setPop={setPop} contentType='globalInterview' />}
            </Suspense>

        </div>
    )
}

export default GlobalInterviewCard