import React from 'react'
import errorIcon from '../assets/errorIcon.png'

const Error = ({ text = "" }) => {
    return (
        <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
            <img className='w-[50px] h-[50px]' src={errorIcon} alt="loader" srcSet="" />
            <p className='capitalize'>{text.length > 5 ? text : "some error occured : try again"}</p>
        </div>
    )
}

export default Error