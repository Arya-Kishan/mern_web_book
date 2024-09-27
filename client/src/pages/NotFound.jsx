import React from 'react'
import { useNavigate } from 'react-router-dom'
import notFound from '../assets/notFound.svg'
import MyImage from '../components/MyImage';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-4 text-white'>

            <MyImage className='w-[200px] h-[200px] md:w-[400px] md:h-[400px]' src={notFound} alt="notFound" />

            <p>LOOKS LIKE YOU ARE LOST</p>
            <p onClick={() => navigate("/home")} className='w-[100px] rounded-lg px-4 py-1 bg-customGreen text-center'>HOME</p>

        </div>
    )
}

export default NotFound