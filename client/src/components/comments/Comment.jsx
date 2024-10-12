import React, { useState } from 'react'
import chatIcon from '../../assets/chat.svg'
import MyImage from '../MyImage';
import PopUp from '../common/PopUp';
import CommentsBox from './CommentsBox';
import AddComment from './AddComment';
const Comment = ({ details, category = "post", }) => {

    const [showPopUp, setShowPopUp] = useState(false);
    const [editComment, setEditComment] = useState({ commentId: "", showEditBtn: false,comment:"" });    

    return (
        <div className='w-[20px] h-[20px]'>
            <MyImage className={"w-[20px] h-[20px]"} src={chatIcon} onClick={() => setShowPopUp(!showPopUp)} />

            <PopUp show={showPopUp} setShow={setShowPopUp}>

                {/* SHOW ALL COMMENT ON PARTICULAR QUESTION */}
                <CommentsBox details={details} category={category} editComment={editComment} setEditComment={setEditComment} />

                <AddComment details={details} category={category} editComment={editComment} setEditComment={setEditComment} />

            </PopUp>
        </div>
    )
}

export default Comment