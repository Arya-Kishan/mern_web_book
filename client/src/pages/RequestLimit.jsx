import React from 'react'
import limitReached from '../assets/limitReached.svg'


const RequestLimit = () => {
    return (
        <div className='w-full h-dvh flex flex-col justify-center items-center text-white'>
            <img loading="lazy" className='w-[200px] md:w-[400px]' src={limitReached} alt="" srcSet="" />
            <p>You have reached Your <span className='text-red-600'>daily Limit request</span></p>
            <p>Try again after <span className='text-customGreen'>15 mins</span></p>
        </div>
    )
}

export default RequestLimit