import React from 'react'
import MainSlider from './MainSlider'

const LikedUser = ({ show, setShow, likedArr }) => {

    return (
        <MainSlider show={show} setShow={setShow} height='50%'>
            <div className='w-full h-[calc(100dvh-167px)] flex flex-col gap-5 overflow-scroll'>
                {likedArr.map((e) => (
                    <div key={e._id} className='w-full text-start flex gap-6 items-center'>
                        <img loading="lazy" className='w-[40px]' src={`https://api.multiavatar.com/${e.name}.svg`} alt="" />
                        <p className='text-[20px]'>{e.name}</p>
                    </div>
                ))}
            </div>
        </MainSlider>
    )
}

export default LikedUser