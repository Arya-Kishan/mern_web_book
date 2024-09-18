import React from 'react'
import oops from '../assets/oops.svg'
const ErrorBoundayPage = () => {
    return (
        <div className='window-center flex-col gap-4 text-white pb-20'>
            <img className='w-[200px] md:w-[400px]' src={oops} alt="" srcSet="" />
            <p className='uppercase font-medium'>Oops something went wrong</p>
        </div>
    )
}

export default ErrorBoundayPage