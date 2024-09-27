import React, { lazy, Suspense, useEffect, useState } from 'react'
import puzzleIcon from '../../assets/puzzle.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import personalIcon from '../../assets/personal.svg'
import globeIcon from '../../assets/globe.svg'
import { useNavigate } from 'react-router-dom'
import ThreeDotPopUp from '../popups/ThreeDotPopUp'
import MyImage from '../MyImage'
const DeletePopUp = lazy(() => import("../popups/DeletePopUp"))

const McqCard = ({ mcq }) => {
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
        <div className='flex flex-col gap-3 justify-evenly items-start bg-gradient-to-r from-blue-900 to-bg-card rounded-lg w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-2 cursor-pointer'>

            <div onClick={e => e.stopPropagation()} className='w-full flex gap-2 items-center justify-between relative'>

                <div className='flex items-center gap-2'>
                    <MyImage src={puzzleIcon} className={"w-[30px] h-[30px]"} alt='puzzleIcon' />
                    <p className='line-clamp-1'>{mcq.title}</p>
                </div>

                <MyImage src={mcq.mcqType == "personal" ? threeDotIcon : globeIcon} onClick={(e) => { setPop(!pop) }} className={"w-[30px] h-[30px]"} alt='threeDotIcon' />


                {/* THREE DOT POP UP */}
                {!pop ? ""
                    :
                    mcq.mcqType == "personal"
                        ?
                        <ThreeDotPopUp setPop={setPop} id={mcq._id} contentType={"mcqCard"} content={mcq} />
                        :
                        <p onClick={() => { setShow(!show) }} className='w-[150px] bg-bgNotePop flex items-center gap-2 absolute top-0 left-full rounded-lg p-1 overflow-hidden z-20'>
                            <MyImage src={personalIcon} className={"w-[30px] h-[30px]"} alt='personalIcon' />
                            <span>Delete From Global</span>
                        </p>
                }

            </div>

            <div className='line-clamp-2'>{mcq.description}</div>

            <div className='w-full flex justify-start items-center'>
                <button onClick={() => navigate(`/home/mcqDetail/${mcq.mcqType == "personal" ? mcq._id : mcq.mcqId}?title=${mcq.title}`)} className='w-[100px] text-textColor4 font-semibold bg-bgBtn1 p-2 rounded-lg'>Check</button>
            </div>

            <Suspense fallback="">
                {show && <DeletePopUp setShow={setShow} id={mcq._id} setPop={setPop} contentType='globalMcq' />}
            </Suspense>

        </div>
    )
}

export default McqCard