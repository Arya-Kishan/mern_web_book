import React, { useState } from 'react'
import dayjs from 'dayjs';

import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import avatarIcon from '../../assets/avatar.svg'

import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import PopUp from '../common/PopUp';
import { useAddGlobalInterviewCommentMutation, useDeleteGlobalInterviewCommentMutation, useEditGlobalInterviewCommentMutation, useGetGlobalInterviewCommentQuery } from '../../Redux/Comment/GlobalInterviewCommentApi';
import Error from '../Error';
import MyImage from '../MyImage';

const GlobalInterviewCommentPopUp = ({ setShow, id }) => {

    const [ans, setAns] = useState("")
    const [toggleBtns, setToggleBtns] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const userId = useSelector(selectUserId);

    const { data: comments } = useGetGlobalInterviewCommentQuery(id);
    const [addComment, { isLoading: commentAdding, isError: addingError, error: addingErrorData }] = useAddGlobalInterviewCommentMutation();
    const [editComment, { isLoading: commentUpdating, isError: updatingError, error: updatingErrorData }] = useEditGlobalInterviewCommentMutation();
    const [deleteComment, { isLoading: commentDeleting, isError: deletingError, error: deletingErrorData }] = useDeleteGlobalInterviewCommentMutation();

    const handleAddComment = () => {
        let newComment = {
            "comment": ans,
            "globalInterviewId": id,
            "userId": userId
        }
        addComment(newComment);
    }

    const handleEditComment = () => {
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

    if (addingError || updatingError || deletingError) {
        return <Error text={`Error in global interview comment pop up`} errorResponse={addingErrorData || updatingErrorData || deletingErrorData} />
    }

    return (
        <PopUp setShow={setShow} height='80vh'>

            {/* SHOW ALL COMMENT ON PARTICULAR QUESTION */}
            <div className='w-[90%] h-[40vh] bg-blue-500 text-white flex flex-col gap-2 overflow-scroll'>

                {comments?.length > 0
                    ?
                    comments?.map((e) => (

                        <div key={e._id} className='w-full flex justify-between items-start p-2 gap-2'>

                            {/* SHOWING USER PROFILE ,NAME AND HIS COMMENT */}
                            <div className='w-full flex flex-col items-start gap-1'>

                                <div className='flex gap-2 items-center'>
                                    <MyImage className='w-[25px] h-[25px]' src={avatarIcon} alt="icon" />
                                    <p className='text-[13px] sm:text-[15px]'>{e.userId?.name}</p>
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

                    )) : <div className='w-full h-full flex justify-center items-center'>No Comments...</div>}
            </div>

            {/* ADD COMMENT */}
            <textarea className='w-[90%] h-[30%] p-1 outline-none text-black' onKeyUp={handleEnter} type="text" value={ans} onChange={(e) => setAns(e.target.value)} placeholder='your comment ...' />

            {/* BUTTON TO ADD AND EDIT COMMENT */}
            {!toggleBtns
                ?
                <button disabled={commentAdding} className='w-[90%] bg-blue-400 px-4 py-2 rounded-lg' onClick={handleAddComment}>{commentAdding
                    ?
                    "Adding..."
                    :
                    "Add"}</button>
                :
                <button disabled={commentUpdating} className='w-[90%] bg-blue-400 px-4 py-2 rounded-lg' onClick={handleEditComment}>{commentUpdating
                    ?
                    "Editing..."
                    :
                    "Edit"}</button>
            }



        </PopUp>

    )
}

export default GlobalInterviewCommentPopUp