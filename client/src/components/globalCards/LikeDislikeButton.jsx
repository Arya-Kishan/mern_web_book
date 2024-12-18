import React, { lazy, Suspense, useContext, useState } from 'react'
import { useEditGlobalInterviewMutation } from '../../Redux/GlobalInterview/GlobalInterviewApi';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import likeIcon from '../../assets/icons/like.svg'
import dislikeIcon from '../../assets/icons/dislike.svg'
import { useEditGlobalMcqMutation } from '../../Redux/GlobalMcq/GlobalMcqApi';
const LikedUser = lazy(() => import("../Slider/LikedUser"))
import MyImage from '../MyImage';
import { MyContext } from '../../Context/SocketContext';
import { useEditPostMutation } from '../../Redux/Post/postApi';

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

    const { sendSocketNotification } = useContext(MyContext)

    const [editInterview] = useEditGlobalInterviewMutation();
    const [editMcq] = useEditGlobalMcqMutation();
    const [editPost] = useEditPostMutation();

    const handleLikes = (wtd) => {
        if (wtd == "add" && category == "interview") {
            setCheckLiked({ count: checkLiked.count + 1, likedOrNot: true })
            let updatedInterview = { id: data._id, query: "category=likes&type=add", likes: loggedInUser._id }
            editInterview(updatedInterview);
            sendSocketNotification({ to: data.userId._id, message: `${loggedInUser.name} liked your ${category} - ${data.title}`, category: "globalInterview", cardId: data._id, action: 'liked' });
        } else if (wtd == "delete" && category == "interview") {
            setCheckLiked({ count: checkLiked.count - 1, likedOrNot: false })
            let updatedInterview = { id: data._id, query: "category=likes&type=delete", likes: loggedInUser._id }
            editInterview(updatedInterview);
        } else if (wtd == "add" && category == "mcq") {
            setCheckLiked({ count: checkLiked.count + 1, likedOrNot: true })
            let updatedMcq = { id: data._id, query: "category=likes&type=add", likes: loggedInUser._id }
            editMcq(updatedMcq);
            sendSocketNotification({ to: data.userId._id, message: `${loggedInUser.name} liked your ${category} - ${data.title}`, category: "globalMcq", cardId: data._id, action: 'liked' });
        } else if (wtd == "delete" && category == "mcq") {
            setCheckLiked({ count: checkLiked.count - 1, likedOrNot: false })
            let updatedMcq = { id: data._id, query: "category=likes&type=delete", likes: loggedInUser._id }
            editMcq(updatedMcq);
        } else if (wtd == "add" && category == "post") {
            setCheckLiked({ count: checkLiked.count + 1, likedOrNot: true })
            let updatedPost = { id: data._id, query: "category=likes&type=add", likes: loggedInUser._id }
            editPost(updatedPost);
            sendSocketNotification({ to: data.userId._id, message: `${loggedInUser.name} liked your ${category} - ${data.title}`, category: "post", cardId: data._id, action: 'liked' });
        } else if (wtd == "delete" && category == "post") {
            setCheckLiked({ count: checkLiked.count - 1, likedOrNot: false })
            let updatedPost = { id: data._id, query: "category=likes&type=delete", likes: loggedInUser._id }
            editPost(updatedPost);
        }

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

            <Suspense fallback={""}>
                {
                    slider
                    &&
                    <LikedUser show={slider} setShow={setSlider} category={category} cardId={data._id} />
                }
            </Suspense>

        </>
    )
}

export default LikeDislikeButton