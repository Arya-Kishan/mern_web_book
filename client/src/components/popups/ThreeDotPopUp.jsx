import React, { useState } from 'react'
import DeletePopUp from './DeletePopUp';
import MakeGlobalPopUp from './MakeGlobalPopUp';


import globeIcon from '../../assets/globe.svg'
import deleteIcon from '../../assets/delete.svg'
import cancelIcon from '../../assets/cancel.svg'
import editIcon from '../../assets/edit.svg'

import { useNavigate } from 'react-router-dom';
import MyImage from '../MyImage';

const ThreeDotPopUp = ({ setPop, id, public_id = "", contentType, content = "" }) => {

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
        } else if (contentType == "postCard") {
            navigate(`/home/createPost?type=update&postId=${id}`)
        }

    }

    return (

        <div onClick={e => e.stopPropagation()} className='bg-bgNotePop absolute top-0 right-6 rounded-lg overflow-hidden z-20'>

            <div className='flex flex-col gap-1'>

                {
                    contentType !== "postCard"
                    &&
                    <div onClick={() => { setGlobal(true) }} className='flex gap-1 items-center p-1 w-[100px]'>
                        <MyImage src={globeIcon} className={"w-[20px] h-[20px]"} />
                        <span>Global</span>
                    </div>
                }

                <div onClick={handleUpdateNavigate} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={editIcon} className={"w-[20px] h-[20px]"} />
                    <span>Edit</span>
                </div>

                <div onClick={() => { setDeletePop(true) }} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={deleteIcon} className={"w-[20px] h-[20px]"} alt='deleteIcon' />
                    <span>Delete</span>
                </div>

                <div onClick={() => setPop(false)} className='flex gap-1 items-center p-1 w-[100px]'>
                    <MyImage src={cancelIcon} className={"w-[20px] h-[20px]"} alt='deleteIcon' />
                    <span>Close</span>
                </div>

            </div>


            {/*     DELETE POP UP */}
            {deletePop && <DeletePopUp setShow={setDeletePop} setPop={setPop} id={id} public_id={public_id} contentType={contentType} />}

            {/*     MAKING GLOBAL POP UP */}
            {global && <MakeGlobalPopUp setShow={setGlobal} setPop={setPop} id={id} contentType={contentType} content={content} />}

        </div>
    )
}

export default ThreeDotPopUp