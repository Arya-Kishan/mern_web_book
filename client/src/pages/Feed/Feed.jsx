import React from 'react'
import MyImage from '../../components/MyImage'
import filterIcon from "../../assets/icons/filterIcon.svg"

const Feed = () => {
    return (
        <div className='w-full h-full'>

            <div className='w-full h-[32px] flex justify-between'>
                <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Feed</p>
                <MyImage className={"w-[32px] h-[32px]"} onClick={() => { }} src={filterIcon} alt="" />
            </div>

            <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-5 pt-5'>
                
            </div>

        </div>
    )
}

export default Feed