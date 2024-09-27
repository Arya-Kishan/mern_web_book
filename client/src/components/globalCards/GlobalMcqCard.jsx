import React, { lazy, Suspense, useEffect, useState } from 'react'
import puzzleIcon from '../../assets/puzzle.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import personalIcon from '../../assets/personal.svg'
import globeIcon from '../../assets/globe.svg'
import chatIcon from '../../assets/chat.svg'
import eyeIcon from '../../assets/icons/eyeIcon.svg'
import { useNavigate } from 'react-router-dom'
import LikeDislikeButton from './LikeDislikeButton'
import GlobalMcqCommentPopUp from '../comments/GlobalMcqCommentPopUp'
import MyImage from '../MyImage'
const DeletePopUp = lazy(() => import("../popups/DeletePopUp"))

const GlobalMcqCard = ({ mcq }) => {
    const navigate = useNavigate();
    const [pop, setPop] = useState(false);
    const [show, setShow] = useState(false);
    const [commentShow, setCommentShow] = useState(false);

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
        <div className='flex flex-col gap-3 justify-between items-end bg-gradient-to-r from-blue-900 to-bg-card rounded-lg w-full md:w-[48%] lg:w-[31.5%] h-[250px] p-2 cursor-pointer'>

            <div className='w-full h-full flex flex-col gap-3 justify-evenly items-start'>
                <div onClick={e => e.stopPropagation()} className='w-full flex gap-2 items-center justify-between relative'>

                    <div className='flex items-center gap-2'>
                        <MyImage className={"w-[30px] h-[30px]"} src={puzzleIcon} alt="icon" />
                        <p className='line-clamp-1'>{mcq.title}</p>
                    </div>

                    <MyImage onClick={(e) => { setPop(!pop) }} className={"w-[27px] h-[27px]"} src={mcq.mcqType == "personal" ? threeDotIcon : globeIcon} alt="icon" />

                    {/* THREE DOT POP UP */}
                    {!pop ? ""
                        :
                        <p onClick={() => { setShow(!show) }} className='w-[150px] bg-bgNotePop flex items-center gap-2 absolute top-0 left-full rounded-lg p-1 overflow-hidden z-20'>
                            <MyImage className={"w-[22px] h-[24px]"} src={personalIcon} alt="icon" />
                            <span>Delete From Global</span>
                        </p>
                    }

                </div>

                <div className='line-clamp-2'>{mcq.description}</div>

                <div className='w-full flex justify-start items-center'>
                    <button onClick={() => navigate(`/home/mcqDetail/${mcq.mcqType == "personal" ? mcq._id : mcq.mcqId}?title=${mcq.title}`)} className='w-[100px] text-textColor4 font-semibold bg-bgBtn1 p-2 rounded-lg'>Check</button>
                </div>
            </div>

            <div className='w-[180px] h-[20px] flex justify-evenly gap-1'>
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
                <div onClick={() => { setCommentShow(!commentShow) }} className='w-full flex items-center gap-1 text-center'>
                    <MyImage className='w-[20px] h-[20px]' src={chatIcon} alt="icon" />
                    <p>{mcq?.comments?.length}</p>
                </div>
            </div>

            <Suspense fallback="">
                {show && <DeletePopUp setShow={setShow} id={mcq._id} setPop={setPop} contentType='globalMcq' />}
                {commentShow ? <GlobalMcqCommentPopUp setShow={setCommentShow} id={mcq._id} /> : ''}
            </Suspense>

        </div>
    )
}

export default GlobalMcqCard