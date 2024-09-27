import React, { useState } from 'react'
import { useEditGlobalInterviewMutation } from '../../Redux/GlobalInterview/GlobalInterviewApi';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import likeIcon from '../../assets/icons/like.svg'
import dislikeIcon from '../../assets/icons/dislike.svg'
import { useEditGlobalMcqMutation } from '../../Redux/GlobalMcq/GlobalMcqApi';
import LikedUser from '../Slider/LikedUser';
import Error from '../Error';
import MyImage from '../MyImage';

const LikeDislikeButton = ({ data, category = "interview", likedArr = [] }) => {

    const loggedInUser = useSelector(selectLoggedInUser);
    const [slider, setSlider] = useState(false);

    const checkAlreadyLiked = () => {
        let isLiked = data?.likes?.findIndex((e) => e._id == loggedInUser._id)
        if (isLiked == -1) {
            return false;
        } else {
            return true;
        }
    }

    const [checkLiked, setCheckLiked] = useState({ count: data?.likes?.length, likedOrNot: checkAlreadyLiked() });

    const [editInterview, { isLoading: globalInterviewLoading, isError: globalInterviewError, error: globalInterviewErrorData, isSuccess: globalInterviewSuccess }] = useEditGlobalInterviewMutation();
    const [editMcq, { isLoading: globalMcqLoading, isError: globalMcqError, error: globalMcqErrorData, isSuccess: globalMcqSuccess }] = useEditGlobalMcqMutation();

    const handleLikes = (wtd) => {
        if (wtd == "add" && category == "interview") {
            setCheckLiked({ count: checkLiked.count + 1, likedOrNot: true })
            let updatedInterview = { id: data._id, query: "category=likes&type=add", likes: loggedInUser._id }
            editInterview(updatedInterview);
        } else if (wtd == "delete" && category == "interview") {
            setCheckLiked({ count: checkLiked.count - 1, likedOrNot: false })
            let updatedInterview = { id: data._id, query: "category=likes&type=delete", likes: loggedInUser._id }
            editInterview(updatedInterview);
        } else if (wtd == "add" && category == "mcq") {
            setCheckLiked({ count: checkLiked.count + 1, likedOrNot: true })
            let updatedMcq = { id: data._id, query: "category=likes&type=add", likes: loggedInUser._id }
            editMcq(updatedMcq);
        } else if (wtd == "delete" && category == "mcq") {
            setCheckLiked({ count: checkLiked.count - 1, likedOrNot: false })
            let updatedMcq = { id: data._id, query: "category=likes&type=delete", likes: loggedInUser._id }
            editMcq(updatedMcq);
        }
    }

    if (globalInterviewError || globalMcqError) {
        return <Error text={`Error in likeDislikeButton`} errorResponse={globalInterviewErrorData || globalMcqErrorData || deletingErrorData} />
    }

    return (
        <>
            {checkLiked.likedOrNot
                ?
                <MyImage onClick={() => handleLikes("delete")} className='w-[20px] h-[20px]' src={dislikeIcon} alt="icon" />
                :
                <MyImage onClick={() => handleLikes("add")} className='w-[20px] h-[20px]' src={likeIcon} alt="icon" />
            }
            <p onClick={() => setSlider(true)}>{checkLiked.count}</p>

            <LikedUser show={slider} setShow={setSlider} likedArr={likedArr} />
        </>
    )
}

export default LikeDislikeButton