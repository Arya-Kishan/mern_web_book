import React from 'react'
import MainSlider from './MainSlider'
import UserHeading from '../UserHeading'

const LikedUser = ({ show, setShow, likedArr }) => {

    return (
        <MainSlider show={show} setShow={setShow} height='50%'>
            <div className='w-full h-[calc(100dvh-167px)] flex flex-col gap-5 overflow-scroll'>
                {
                    likedArr.length < 1
                        ?
                        <div className='w-full h-full flex justify-center items-center'>NO LIKES</div>
                        :
                        likedArr.map((e) => (
                            <div key={e._id} className='w-full text-start flex gap-6 items-center'>
                                <UserHeading name={e.name} userId={e._id} />
                            </div>
                        ))
                }
            </div>
        </MainSlider>
    )
}

export default LikedUser