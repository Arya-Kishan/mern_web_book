import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../../assets/logout.svg'
import MyImage from '../../components/MyImage';
import { auth } from '../../services/Firebase';
import { logoutUser, selectGoogleUserDetails } from '../../Redux/Auth/AuthSlice';

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const googleUserDetails = useSelector(selectGoogleUserDetails)


    const handleLogout = () => {
        localStorage.setItem("x-webbook-jwt-routes", null);
        dispatch(logoutUser());
        if (googleUserDetails) {
            auth.signOut();
        }
        navigate("/")
    }

    return (
        <div onClick={handleLogout} className='w-full flex gap-2 justify-center items-center cursor-pointer'>
            <MyImage className={"w-[30px] h-[30px]"} src={logoutIcon} alt="" />
            <p>Logout</p>
        </div>
    )
}

export default Logout