import React, { lazy, Suspense, useState } from 'react'
import { useSelector } from 'react-redux'

import chatIcon from '../assets/chat.svg'
import linkIcon from '../assets/link.svg'
import deleteIcon from '../assets/delete.svg'
import editIcon from '../assets/edit.svg'
import down_ArrowIcon from '../assets/down_Arrow.svg'

import { selectUserId } from '../Redux/Auth/AuthSlice'
import MyImage from './MyImage'

const AddQuestion = lazy(() => import("./Slider/AddQuestion"))
const DeletePopUp = lazy(() => import("./popups/DeletePopUp"))
const LinkPopUp = lazy(() => import("./popups/LinkPopUp"))
const CommentPopUp = lazy(() => import("./popups/CommentPopUp"))

const Accordion = ({ content }) => {

    const userId = useSelector(selectUserId)
    const [slide, setSlide] = useState(false);
    const [updateshow, setUpdateshow] = useState(false);
    const [deleteshow, setDeleteshow] = useState(false);
    const [linkShow, setLinkShow] = useState(false);
    const [commentShow, setCommentShow] = useState(false);

    const handleAccord = () => {
        setSlide(!slide);
    }

    return (
        <div className='w-full h-fit flex flex-col gap-1 p-1'>

            <div onClick={handleAccord} className='w-full flex justify-between items-center bg-blue-600 p-2 rounded-md'>
                <p className='w-full overflow-hidden'>{content.question} ?</p>
                {slide
                    ?
                    <MyImage className='w-[20px] h-[20px] rotate-180' src={down_ArrowIcon} alt="icon" />
                    :
                    <MyImage className='w-[20px] h-[20px]' src={down_ArrowIcon} alt="icon" />
                }
            </div>

            <div className={`bg-blue-800 ${slide ? "flex flex-col" : 'hidden'} p-2 rounded-md flex flex-col gap-4`}>
                <p dangerouslySetInnerHTML={{ __html: content.answer }}></p>

                <div className='flex items-center justify-end gap-1'>
                    <MyImage onClick={() => { setCommentShow(!commentShow) }} className='w-[18px] h-[18px]' src={chatIcon} alt="icon" />
                    <MyImage onClick={() => setLinkShow(!linkShow)} className='w-[18px] h-[18px]' src={linkIcon} alt="icon" />
                    {content.userId == userId ? <>
                        <MyImage onClick={() => setUpdateshow(!updateshow)} className='w-[18px] h-[18px]' src={editIcon} alt="" />
                        <MyImage onClick={() => setDeleteshow(!deleteshow)} className='w-[18px] h-[18px]' src={deleteIcon} alt="" />
                    </> : null}
                </div>

            </div>

            <Suspense fallback={""}>
                {updateshow && <AddQuestion show={updateshow} setShow={setUpdateshow} interviewId={content._id} type={"update"} />}
                {deleteshow ? <DeletePopUp setShow={setDeleteshow} id={content._id} contentType={"question"} /> : ''}
                {linkShow ? <LinkPopUp setShow={setLinkShow} content={content} /> : ''}
                {commentShow ? <CommentPopUp setShow={setCommentShow} id={content._id} /> : ''}
            </Suspense>


        </div>
    )
}

export default Accordion