import React, { useState } from 'react'
import linkedInIcon from '../../assets/linkedIn.svg'
import nameIcon from '../../assets/name.svg'
import catIcon from '../../assets/cat.svg'
import shareIcon from '../../assets/share.svg'
import MyImage from '../../components/MyImage'
import SharePopUp from '../../components/popups/SharePopUp'

const End = () => {

    return (
        <div className='w-full h-[300px] flex flex-col justify-between items-center bg-gradient-to-b from-[#0A0A46] to-transparent text-white pt-[40px]'>

            <div className='w-full flex flex-col items-center gap-2 mt-[60px]'>
                <p className='w-full text-[20px] md:text-[40px] font-bold flex justify-center items-center gap-2 flex-wrap'>
                    <span>Interested to contribute</span>
                    <span>Check it out</span>
                </p>

                <a href='https://github.com/Arya-Kishan/mern_web_book' target='_blank' className='flex items-center gap-6'>
                    <MyImage className='w-[30px] h-[30px]' src={catIcon} alt="" />
                    <p className='text-[20px]'>Github</p>
                    <MyImage className='w-[30px] h-[30px]' src={catIcon} alt="" />
                </a>
            </div>

            <div className='w-full h-[50px] flex justify-between items-center gap-2 px-2 sm:px-10 '>
                <span className='hidden sm:block'>Developer</span>
                <span>Arya Kishan</span>
                <div className='flex gap-2'>
                    <MyImage className='w-[20px] h-[20px] sm:w-[35px] sm:h-[35px]' src={nameIcon} alt="" />
                    <MyImage className='w-[20px] h-[20px] sm:w-[35px] sm:h-[35px]' src={linkedInIcon} alt="" />
                    <SharePopUp link='' imgClassName='w-[20px] h-[20px] sm:w-[35px] sm:h-[35px]' />
                </div>
            </div>



        </div>
    )
}

export default End