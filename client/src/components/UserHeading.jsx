import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyImage from './MyImage';

const UserHeading = ({ userId, name, showImage = "show", showName = "show" }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/home/profile/${userId}`)} className='w-full h-full flex items-center gap-2'>
            {showImage == "show" && <MyImage src={`https://api.multiavatar.com/${name}.svg`} className={"w-[30px] h-[30px]"} />}
            {showName == "show" && <p className='capitalize'>{name}</p>}
        </div>
    )
}

export default UserHeading