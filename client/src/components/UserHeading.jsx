import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyImage from './MyImage';
import avatar01 from '../assets/avatar01.svg';

const UserHeading = ({
    userId,
    name,
    showImage = "show",
    showName = "show",
    imageHeight = "w-[30px] h-[30px]",
    className = "flex items-center gap-2",
    navigateToProfile = true
}) => {
    const navigate = useNavigate();
    const [image,setImage] = React.useState(`https://api.multiavatar.com/${name}.svg`);
    const handleImgLoadError = (err) => {
        setImage(avatar01);
    }
    return (
        <div onClick={() => { navigateToProfile == true ? navigate(`/home/profile/${userId}`) : "" }} className={`${className}`}>
            {showImage == "show" && <MyImage src={image} className={imageHeight} handleImgLoadError={handleImgLoadError} />}
            {showName == "show" && <p className='capitalize'>{name}</p>}
        </div>
    )
}

export default UserHeading