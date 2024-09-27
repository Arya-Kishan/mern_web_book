import React, { useEffect, useState } from 'react'
import editIcon from '../../assets/edit.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import { useNavigate } from 'react-router-dom'
import ThreeDotPopUp from '../popups/ThreeDotPopUp'
import dayjs from 'dayjs'
import { getRandomColor } from '../../helper/customFunction'
import MyImage from '../MyImage'

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
        <div onClick={() => navigate(`/home/noteDetail/${note._id}?title=${note.title}`)} className='flex flex-col gap-3 justify-between items-start w-full md:w-[48%] lg:w-[31.5%] h-[200px] p-4 rounded-lg cursor-pointer' style={{ background: `${getRandomColor()}` }}>

            <div className='w-full flex flex-col gap-1'>

                <div className='w-full flex justify-between relative'>

                    <p className='font-semibold text-2xl line-clamp-1'>{note.title}</p>
                    <MyImage className={"w-[30px] h-[32px]"} onClick={(e) => { e.stopPropagation(); setPop(!pop) }} src={threeDotIcon} alt='icon' />

                    {/* pop up */}
                    {pop && <ThreeDotPopUp setPop={setPop} id={note._id} contentType={"noteCard"} />}

                </div>

                <p className='line-clamp-4'>{note.description}</p>

            </div>

            <div className='w-full flex gap-2 items-center justify-between'>

                <p className='text-[12px]'>{dayjs(note.createdAt).format("DD/MM/YY")}</p>

                <MyImage src={editIcon} onClick={(e) => { e.stopPropagation(); navigate(`/home/createNote?type=update&noteId=${note._id}`) }} className={"w-[30px] h-[30px] bg-[#0A0A46] p-[6px] rounded-full"} alt='editIcon' />

            </div>

        </div>
    )
}

export default NoteCard