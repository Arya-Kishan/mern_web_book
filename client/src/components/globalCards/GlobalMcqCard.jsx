import React, { lazy, Suspense, useEffect, useState } from 'react'
import puzzleIcon from '../../assets/puzzle.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import personalIcon from '../../assets/personal.svg'
import globeIcon from '../../assets/globe.svg'
import eyeIcon from '../../assets/icons/eyeIcon.svg'
import { useNavigate } from 'react-router-dom'
import LikeDislikeButton from './LikeDislikeButton'
import MyImage from '../MyImage'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../Redux/Auth/AuthSlice'
import UserHeading from '../UserHeading'
import Comment from '../comments/Comment'
import SharePopUp from '../popups/SharePopUp'
const DeletePopUp = lazy(() => import("../popups/DeletePopUp"))

const GlobalMcqCard = ({ mcq }) => {
    const navigate = useNavigate();
    const [pop, setPop] = useState(false);
    const [show, setShow] = useState(false);
    const userId = useSelector(selectUserId)

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
        <div className='flex flex-col justify-between items-end bg-gradient-to-r from-blue-900 to-bg-card rounded-lg w-full md:w-[48%] lg:w-[31.5%] h-[280px] cursor-pointer overflow-hidden'>

            <div onClick={e => e.stopPropagation()} className='w-full h-[50px] flex gap-2 items-center bg-bgHistoryPop p-2 relative'>
                <UserHeading userId={mcq.userId._id} name={mcq.userId.name} />

                {mcq.userId._id == userId && <MyImage onClick={(e) => { setPop(!pop) }} className={"w-[27px] h-[27px]"} src={mcq.mcqType == "personal" ? threeDotIcon : globeIcon} alt="icon" />}
                <SharePopUp link={`/home/link/mcq/${mcq._id}`} />

                {/* THREE DOT POP UP */}
                {!pop ? ""
                    :
                    <div onClick={() => { setShow(!show) }} className='w-[200px] bg-bgNotePop flex items-center gap-2 absolute top-[30px] right-[10px] rounded-lg p-1 overflow-hidden z-20'>
                        <MyImage className={"w-[22px] h-[24px]"} src={personalIcon} alt="icon" />
                        <span>Delete From Global</span>
                    </div>
                }

            </div>

            <div className='w-full h-full flex flex-col gap-3 justify-evenly items-start p-2'>

                <div onClick={e => e.stopPropagation()} className='w-full flex gap-2 items-center justify-between'>

                    <div className='flex items-center gap-2'>
                        <MyImage className={"w-[30px] h-[30px]"} src={puzzleIcon} alt="icon" />
                        <p className='line-clamp-1'>{mcq.title}</p>
                    </div>

                </div>

                <div className='line-clamp-2'>{mcq.description}</div>

                <div className='w-full flex justify-start items-center'>
                    <button onClick={() => navigate(`/home/mcqDetail/${mcq.mcqType == "personal" ? mcq._id : mcq.mcqId}?title=${mcq.title}`)} className='w-[100px] text-textColor4 font-semibold bg-customGreen p-2 rounded-lg'>Check</button>
                </div>
            </div>

            <div className='w-[180px] h-[30px] flex justify-evenly gap-1'>
                {/* views */}
                <div className='w-full flex items-center gap-1 text-center'>
                    <MyImage className='w-[20px] h-[20px]' src={eyeIcon} alt="icon" />
                    <p>{mcq?.views}</p>
                </div>
                {/* likes */}
                <div className='w-full flex gap-1 text-center items-center'>
                    <LikeDislikeButton data={mcq} category="mcq" likedArr={mcq.likes} />
                </div>
                {/* comments */}
                <div className='w-full flex items-center gap-1 text-center'>
                    <Comment details={mcq} category='globalMcq' />
                    <p>{mcq?.comments?.length}</p>
                </div>
            </div>

            <Suspense fallback="">
                {show && <DeletePopUp setShow={setShow} id={mcq._id} setPop={setPop} contentType='globalMcq' />}
            </Suspense>

        </div>
    )
}

export default GlobalMcqCard