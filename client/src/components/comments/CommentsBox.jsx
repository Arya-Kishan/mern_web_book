import React, { useEffect, useState } from 'react'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import MyImage from '../MyImage';
import UserHeading from '../UserHeading';
import dayjs from "dayjs"
import { useDeletePostCommentMutation, useGetPostCommentQuery } from '../../Redux/Comment/postCommentApi';
import Loader from '../Loader';
import { useDeleteGlobalInterviewCommentMutation, useGetGlobalInterviewCommentQuery } from '../../Redux/Comment/GlobalInterviewCommentApi';
import { useDeleteGlobalMcqCommentMutation, useGetGlobalMcqCommentQuery } from '../../Redux/Comment/globalMcqCommentApi';

const CommentsBox = ({ details, category, setEditComment }) => {

    const [skipComments, setSkipComments] = useState({ post: true, globalInterview: true, globalMcq: true });

    const [comments, setComments] = useState([]);

    const { data: postComments, isSuccess: postCommentsSuccess } = useGetPostCommentQuery(details._id, { skip: skipComments.post });
    const { data: globalInterviewComments } = useGetGlobalInterviewCommentQuery(details._id, { skip: skipComments.globalInterview });
    const { data: globalMcqComments } = useGetGlobalMcqCommentQuery(details._id, { skip: skipComments.globalMcq });


    const [deletePostComment] = useDeletePostCommentMutation();
    const [deleteGlobalInterviewComment] = useDeleteGlobalInterviewCommentMutation();
    const [deleteGlobalMcqComment] = useDeleteGlobalMcqCommentMutation();


    const handleDeleteComment = (id) => {
        if (category == "post") {
            deletePostComment(id);
        }
        if (category == "globalInterview") {
            deleteGlobalInterviewComment(id)
        }
        if (category == "globalMcq") {
            deleteGlobalMcqComment(id)
        }
    }

    const handelEditComment = (comment_id, comment) => {
        setEditComment({ commentId: comment_id, showEditBtn: true, comment: comment })
    }

    useEffect(() => {
        if (category == "post") {
            setComments(postComments)
        }
        if (category == "globalInterview") {
            setComments(globalInterviewComments)
        }
        if (category == "globalMcq") {
            setComments(globalMcqComments)
        }
    }, [postComments, globalInterviewComments, globalMcqComments])

    useEffect(() => {
        if (category == "post") {
            setSkipComments({ post: false, globalInterview: true, globalMcq: true })
        }

        if (category == "globalInterview") {
            setSkipComments({ post: true, globalInterview: false, globalMcq: true })
        }

        if (category == "globalMcq") {
            setSkipComments({ post: true, globalInterview: true, globalMcq: false })
        }

    }, [])

    return (
        <div className='w-full h-[80%] bg-blue-500 text-white flex flex-col gap-2 rounded-lg overflow-scroll'>

            {
                !comments
                    ?
                    <Loader />
                    :
                    comments.length < 1
                        ?
                        <div className='w-full h-full flex justify-center items-center'>NO COMMENTS</div>
                        :
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
                                        <MyImage onClick={() => { handelEditComment(e._id, e.comment) }} className='w-[12px] h-[12px]' src={editIcon} alt="icon" />
                                        <MyImage onClick={() => handleDeleteComment(e._id)} className='w-[12px] h-[12px]' src={deleteIcon} alt="icon" />
                                    </div>

                                </div>

                            </div>

                        ))
            }

        </div>
    )
}

export default CommentsBox