import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyImage from './MyImage';

const UserHeading = ({
    userId,
    name,
    showImage = "show",
    showName = "show",
    imageHeight = "w-[30px] h-[30px]",
    className="flex items-center gap-2",
}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/home/profile/${userId}`)} className={`${className}`}>
            {showImage == "show" && <MyImage src={`https://api.multiavatar.com/${name}.svg`} className={imageHeight} />}
            {showName == "show" && <p className='capitalize'>{name}</p>}
        </div>
    )
}

export default UserHeading