import React, { useEffect } from 'react'
import errorIcon from '../assets/errorIcon.png'
import oops from '../assets/oops.png'
import { useNavigate } from 'react-router-dom';
import MyImage from './MyImage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Auth/AuthSlice';

const Error = ({ text = "", errorResponse = '' }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.setItem("x-webbook-jwt-routes", null);
        dispatch(logoutUser());
        navigate("/login")
    }

    useEffect(() => {
        if (errorResponse.status == 429) {
            navigate("/requestLimit")
        }
    }, [])

    return (
        localStorage.getItem("webbook-guest-login") == "guest"
            ?
            <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
                <MyImage className='w-[200px] h-[200px]' src={oops} alt="loader" />
                <div className='flex gap-4'>
                    <button onClick={() => handleLogout()} className='w-[100px] px-4 py-1 rounded-lg bg-customGreen'>Login</button>
                    <button onClick={() => navigate(-1)} className='w-[100px] px-4 py-1 rounded-lg bg-customGreen'>Go Back</button>
                </div>
            </div>
            :

            <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
                <MyImage className='w-[50px] h-[50px]' src={errorIcon} alt="loader" />
                <p onClick={()=>location.reload()} className='capitalize'>{text.length > 5 ? text : "some error occured : try again"}</p>
                <button onClick={() => navigate(-1)} className='w-[100px] px-4 py-1 rounded-lg bg-customGreen'>Go Back</button>
            </div>
    )
}

export default Error