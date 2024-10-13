import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import LoaderButton from '../Button/LoaderButton';
import { MyContext } from '../../Context/SocketContext';
import closeIcon from "../../assets/cancel.svg"
import { useAddPostCommentMutation, useEditPostCommentMutation } from '../../Redux/Comment/postCommentApi';
import MyImage from '../MyImage';
import { useAddGlobalInterviewCommentMutation, useEditGlobalInterviewCommentMutation } from '../../Redux/Comment/GlobalInterviewCommentApi';
import { useAddGlobalMcqCommentMutation, useEditGlobalMcqCommentMutation } from '../../Redux/Comment/globalMcqCommentApi';

const AddComment = ({ details, category, editComment, setEditComment }) => {

    const loggedInUser = useSelector(selectLoggedInUser)
    const [input, setInput] = useState("");

    const { sendSocketNotification } = useContext(MyContext)

    const [addPostComment, { isLoading: addPostCommentLoading, isSuccess: addCommentSuccess }] = useAddPostCommentMutation();
    const [editPostComment, { isLoading: editPostCommentLoading, isSuccess: editCommentSuccess }] = useEditPostCommentMutation();

    const [addGlobalInterviewComment] = useAddGlobalInterviewCommentMutation();
    const [editGlobalInterviewComment] = useEditGlobalInterviewCommentMutation();

    const [addGlobalMcqComment] = useAddGlobalMcqCommentMutation();
    const [editGlobalMcqComment] = useEditGlobalMcqCommentMutation();

    const handleAddComment = () => {

        if (input.length < 2) {
            toast("Write Comment")
            return 0;
        }

        if (category == "post") {
            let newComment = {
                comment: input,
                postId: details._id,
                userId: loggedInUser._id
            }
            addPostComment(newComment);
        }

        if (category == "globalInterview") {

            let newComment = {
                comment: input,
                globalInterviewId: details._id,
                userId: loggedInUser._id
            }
            addGlobalInterviewComment(newComment);
        }

        if (category == "globalMcq") {
            let newComment = {
                comment: input,
                globalMcqId: details._id,
                userId: loggedInUser._id
            }
            addGlobalMcqComment(newComment);
        }

        sendSocketNotification({ to: details.userId._id, message: `${loggedInUser.name} commented on your ${category} - ${details.title}`, category: `${category}`, cardId: details._id, action: 'commented' });

    }

    const handleEditComment = () => {
        if (input.length < 2) {
            toast("Write Comment")
            return 0;
        }
        let newComment = {
            "comment": input,
            "id": editComment.commentId,
        }

        if (category == "post") {
            editPostComment(newComment)
        }

        if (category == "globalInterview") {
            editGlobalInterviewComment(newComment)
        }

        if (category == "globalMcq") {
            editGlobalMcqComment(newComment)
        }


    }

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            handleAddComment()
        }
    }

    const handleCancelEdit = () => {
        setEditComment({ commentId: "", showEditBtn: false, comment: '' })
        setInput("")
    }

    useEffect(() => {
        handleCancelEdit()
    }, [editCommentSuccess, addCommentSuccess])

    useEffect(() => {
        setInput(editComment.comment)
    }, [editComment.comment])

    return (
        <div className='w-[90%] flex gap-1'>
            {/* ADD COMMENT */}
            {!editComment.showEditBtn
                ?
                <input className='w-[90%] p-1 outline-none text-black rounded-md' onKeyUp={handleEnter} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='your comment ...' />
                :
                <div className='w-[90%] flex justify-evenly items-center gap-1 bg-white rounded-md overflow-hidden'>
                    <input className='w-[90%] p-1 outline-none text-black' onKeyUp={handleEnter} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="your comment..." />
                    <div onClick={handleCancelEdit} className='bg-blue-700 rounded-full'><MyImage src={closeIcon} className={"w-[25px] h-[25px]"} /></div>
                </div>
            }

            {/* BUTTON TO ADD AND EDIT COMMENT */}
            {!editComment.showEditBtn
                ?
                <LoaderButton text={"Add"} loading={addPostCommentLoading} onClick={handleAddComment} bgColor='bg-blue-500' width='60px' />
                :
                <LoaderButton text={"Edit"} loading={editPostCommentLoading} onClick={handleEditComment} bgColor='bg-blue-500' width='60px' />
            }

        </div>
    )
}

export default AddComment