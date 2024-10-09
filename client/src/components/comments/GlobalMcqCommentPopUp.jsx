import React, { useContext, useState } from 'react'
import dayjs from 'dayjs';

import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import avatarIcon from '../../assets/avatar.svg'

import { selectLoggedInUser, selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import PopUp from '../common/PopUp';
import { useAddGlobalMcqCommentMutation, useDeleteGlobalMcqCommentMutation, useEditGlobalMcqCommentMutation, useGetGlobalMcqCommentQuery } from '../../Redux/Comment/globalMcqCommentApi';
import MyImage from '../MyImage';
import Loader from '../Loader';
import LoaderButton from '../Button/LoaderButton';
import UserHeading from '../UserHeading';
import { MyContext } from '../../Context/SocketContext';

const GlobalMcqCommentPopUp = ({ mcq, setShow, id }) => {

    const [ans, setAns] = useState("")
    const loggedInUser = useSelector(selectLoggedInUser)
    const [toggleBtns, setToggleBtns] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const userId = useSelector(selectUserId);
    const { sendSocketNotification } = useContext(MyContext)

    const { data: comments, isLoading: commentLoading } = useGetGlobalMcqCommentQuery(id);
    const [addComment, { isLoading: commentAdding, isError: addingError, error: addingErrorData }] = useAddGlobalMcqCommentMutation();
    const [editComment, { isLoading: commentUpdating, isError: updatingError, error: updatingErrorData }] = useEditGlobalMcqCommentMutation();
    const [deleteComment, { isLoading: commentDeleting, isError: deletingError, error: deletingErrorData }] = useDeleteGlobalMcqCommentMutation();

    const handleAddComment = () => {
        if (ans.length < 2) {
            toast("Write Comment")
            return 0;
        }
        let newComment = {
            "comment": ans,
            "globalMcqId": id,
            "userId": userId
        }
        addComment(newComment);
        sendSocketNotification({ to: mcq.userId._id, message: `${loggedInUser.name} commented on your globalMcq - ${mcq.title}`, category: "globalMcqComment", cardId: mcq._id, action: 'commented' });
    }

    const handleEditComment = () => {
        if (ans.length < 2) {
            toast("Write Comment")
            return 0;
        }
        let newComment = {
            "comment": ans,
            "id": commentId,
            "userId": userId
        }
        editComment(newComment)
    }

    const handleDeleteComment = (id) => {
        deleteComment(id);
    }

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            handleAddComment()
        }
    }

    return (
        <PopUp setShow={setShow} height='80vh'>

            {/* SHOW ALL COMMENT ON PARTICULAR QUESTION */}
            <div className='w-[90%] h-[40vh] bg-blue-500 text-white flex flex-col gap-2 overflow-scroll'>

                {commentLoading
                    ?
                    <Loader />
                    :
                    comments?.length > 0
                        ?
                        comments?.map((e) => (

                            <div key={e._id} className='w-full flex justify-between items-start p-2 gap-2'>

                                {/* SHOWING USER PROFILE ,NAME AND HIS COMMENT */}
                                <div className='w-full flex flex-col items-start gap-1'>

                                    <div className='flex gap-2 items-center'>
                                        <UserHeading userId={e.userId?._id} name={e.userId?.name} />
                                    </div>

                                    <p className='text-[13px] sm:text-[15px] pl-[25px]'>{e.comment}</p>

                                </div>

                                {/* SHOWS DATE AND ICONS TO DELETE AND EDIT OCMMENT */}
                                <div className='w-[50px] h-full text-[10px] flex flex-col justify-between items-start gap-1'>

                                    <p>{dayjs(e.createdAt).format("DD MMM")}</p>

                                    <div className='flex gap-1'>
                                        <MyImage onClick={() => { setAns(e.comment); setToggleBtns(true), setCommentId(e._id) }} className='w-[12px] h-[12px]' src={editIcon} alt="icon" />
                                        <MyImage onClick={() => handleDeleteComment(e._id)} className='w-[12px] h-[12px]' src={deleteIcon} alt="icon" />
                                    </div>

                                </div>

                            </div>

                        )) : <div className='w-full h-full flex justify-center items-center'>No Comments...</div>
                }
            </div>

            {/* ADD COMMENT */}
            <textarea className='w-[90%] h-[30%] p-1 outline-none text-black' onKeyUp={handleEnter} type="text" value={ans} onChange={(e) => setAns(e.target.value)} placeholder='your comment ...' />

            {/* BUTTON TO ADD AND EDIT COMMENT */}
            {!toggleBtns
                ?
                <LoaderButton text={"Add"} loading={commentAdding} onClick={handleAddComment} width='90%' />
                :
                <LoaderButton text={"Edit"} loading={commentUpdating} onClick={handleEditComment} width='90%' />
            }

        </PopUp>

    )
}

export default GlobalMcqCommentPopUp