import React, { useEffect } from 'react'
import errorIcon from '../assets/errorIcon.png'
import { useNavigate } from 'react-router-dom';
import MyImage from './MyImage';

const Error = ({ text = "", errorResponse = '' }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (errorResponse.status == 429) {
            navigate("/requestLimit")
        }
    }, [])

    return (
        <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
            <MyImage className='w-[50px] h-[50px]' src={errorIcon} alt="loader" />
            <p className='capitalize'>{text.length > 5 ? text : "some error occured : try again"}</p>
            <button onClick={() => navigate(-1)} className='w-[100px] px-4 py-1 rounded-lg bg-customGreen'>Go Back</button>
        </div>
    )
}

export default Error