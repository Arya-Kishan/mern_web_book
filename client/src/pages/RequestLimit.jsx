import React from 'react'
import limitReached from '../assets/limitReached.svg'
import MyImage from '../components/MyImage'


const RequestLimit = () => {
    return (
        <div className='w-full h-dvh flex flex-col justify-center items-center text-white'>
            <MyImage className='w-[200px] h-[200px] md:w-[400px] md:h-[400px]' src={limitReached} alt="" />
            <p>You have reached Your <span className='text-red-600'>daily Limit request</span></p>
            <p>Try again after <span className='text-customGreen'>15 mins</span></p>
        </div>
    )
}

export default RequestLimit