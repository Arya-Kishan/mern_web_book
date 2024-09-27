import React, { useState } from 'react'
import DeletePopUp from './DeletePopUp';
import MakeGlobalPopUp from './MakeGlobalPopUp';


import globeIcon from '../../assets/globe.svg'
import deleteIcon from '../../assets/delete.svg'
import cancelIcon from '../../assets/cancel.svg'
import editIcon from '../../assets/edit.svg'

import { useNavigate } from 'react-router-dom';
import MyImage from '../MyImage';

const ThreeDotPopUp = ({ setPop, id, contentType, content = "" }) => {

    const [deletePop, setDeletePop] = useState(false);
    const [global, setGlobal] = useState(false);
    const navigate = useNavigate();

    const handleUpdateNavigate = () => {

        if (contentType == "interviewCard") {
            navigate(`/home/createInterview?type=update&interviewId=${id}`)
        } else if (contentType == "noteCard") {
            navigate(`/home/createNote?type=update&noteId=${id}`)
        } else if (contentType == "mcqCard") {
            navigate(`/home/createMcq?type=update&mcqId=${id}`)
        }

    }

    return (

        <div onClick={e => e.stopPropagation()} className='bg-bgNotePop absolute top-0 right-6 rounded-lg overflow-hidden z-20'>

            <div className='flex flex-col gap-1'>

                <p onClick={() => { setGlobal(true) }} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={globeIcon} className={"w-[20px] h-[20px]"} />
                    <span>Global</span>
                </p>

                <p onClick={handleUpdateNavigate} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={editIcon} className={"w-[20px] h-[20px]"} />
                    <span>Edit</span>
                </p>

                <p onClick={() => { setDeletePop(true) }} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={deleteIcon} className={"w-[20px] h-[20px]"} alt='deleteIcon' />
                    <span>Delete</span>
                </p>

                <p onClick={() => setPop(false)} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={cancelIcon} className={"w-[20px] h-[20px]"} alt='deleteIcon' />
                    <span>Close</span>
                </p>

            </div>


            {/*     DELETE POP UP */}
            {deletePop && <DeletePopUp setShow={setDeletePop} setPop={setPop} id={id} contentType={contentType} />}

            {/*     MAKING GLOBAL POP UP */}
            {global && <MakeGlobalPopUp setShow={setGlobal} setPop={setPop} id={id} contentType={contentType} content={content} />}

        </div>
    )
}

export default ThreeDotPopUp