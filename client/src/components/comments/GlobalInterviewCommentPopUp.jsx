import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';

import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import avatarIcon from '../../assets/avatar.svg'

import { selectLoggedInUser, selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import PopUp from '../common/PopUp';
import { useAddGlobalInterviewCommentMutation, useDeleteGlobalInterviewCommentMutation, useEditGlobalInterviewCommentMutation, useGetGlobalInterviewCommentQuery } from '../../Redux/Comment/GlobalInterviewCommentApi';
import Error from '../Error';
import MyImage from '../MyImage';
import Loader from '../Loader';
import LoaderButton from '../Button/LoaderButton';
import { toast } from 'react-toastify';
import UserHeading from '../UserHeading';
import { MyContext } from '../../Context/SocketContext';

const GlobalInterviewCommentPopUp = ({ interview, setShow, id }) => {

    const [ans, setAns] = useState("")
    const loggedInUser = useSelector(selectLoggedInUser)
    const [toggleBtns, setToggleBtns] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const userId = useSelector(selectUserId);
    const { sendSocketNotification } = useContext(MyContext)

    const { data: comments, isLoading: commentLoading } = useGetGlobalInterviewCommentQuery(id);
    const [addComment, { isLoading: commentAdding, isSuccess: addCommentSuccess, isError: addingError, error: addingErrorData }] = useAddGlobalInterviewCommentMutation();
    const [editComment, { isLoading: commentUpdating, isSuccess: editCommentSuccess, isError: updatingError, error: updatingErrorData }] = useEditGlobalInterviewCommentMutation();
    const [deleteComment, { isLoading: commentDeleting, isSuccess: deleteCommentSuccess, isError: deletingError, error: deletingErrorData }] = useDeleteGlobalInterviewCommentMutation();

    const handleAddComment = () => {
        if (ans.length < 2) {
            toast("Write Comment")
            return 0;
        }

        let newComment = {
            "comment": ans,
            "globalInterviewId": id,
            "userId": userId
        }
        addComment(newComment);
        sendSocketNotification({ to: interview.userId._id, message: `${loggedInUser.name} commented on your globalInterview - ${interview.title}`, category: "globalInterviewComment", cardId: interview._id });

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

    useEffect(() => {
        setAns("")
    }, [addCommentSuccess, deleteCommentSuccess, editCommentSuccess])

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
                <LoaderButton text={"Add"} loading={commentAdding} onClick={handleAddComment} bgColor='bg-blue-500' width='90%' />
                :
                <LoaderButton text={"Edit"} loading={commentUpdating} onClick={handleEditComment} bgColor='bg-blue-500' width='90%' />

            }



        </PopUp>

    )
}

export default GlobalInterviewCommentPopUp