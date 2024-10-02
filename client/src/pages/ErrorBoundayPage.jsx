import React from 'react'
import oops from '../assets/oops.png'
import MyImage from '../components/MyImage'
const ErrorBoundayPage = () => {
    return (
        <div className='w-[100vw] h-[100dvh] flex justify-center items-center flex-col gap-4 text-white pb-20'>
            <MyImage className='w-[200px] h-[200px] md:w-[400px] md:h-[400px]' src={oops} alt="oopsIcon" />
            <p className='uppercase font-medium'>Oops something went wrong</p>
            <p className=''>Reload the Page</p>
        </div>
    )
}

export default ErrorBoundayPage