import React, { useEffect, useState } from 'react'
import editIcon from '../../assets/edit.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import { useNavigate } from 'react-router-dom'
import ThreeDotPopUp from '../popups/ThreeDotPopUp'

const NoteCard = ({ note }) => {

    const [pop, setPop] = useState(false);
    const navigate = useNavigate();

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
        <div onClick={() => navigate(`/noteDetail/${note._id}?title=${note.title}`)} className='flex flex-col gap-3 justify-evenly items-start bg-bg-card w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg cursor-pointer'>

            <div className='w-full flex justify-between relative'>
                <p className='font-semibold text-2xl line-clamp-1'>{note.title}</p>
                <img onClick={(e) => { e.stopPropagation(); setPop(!pop) }} src={threeDotIcon} alt="" srcSet="" />

                {/* pop up */}
                {pop && <ThreeDotPopUp setPop={setPop} id={note._id} contentType={"noteCard"} />}

            </div>

            <p className='line-clamp-2'>{note.description}</p>

            <div className='w-full flex gap-2 items-center justify-between pt-[40px]'>

                <p>01/01/25</p>

                <img onClick={(e) => { e.stopPropagation(); navigate(`/createNote?type=update&noteId=${note._id}`) }} className='w-[30px] bg-[#0A0A46] p-[6px] rounded-full' src={editIcon} alt="" srcSet="" />

            </div>

        </div>
    )
}

export default NoteCard