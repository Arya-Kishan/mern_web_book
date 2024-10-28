import React, { useEffect, useState } from 'react'
import MyImage from '../MyImage'
import addIcon from "../../assets/add.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
import SearchUser from './SearchUser'
import { useNavigate } from 'react-router-dom'

const FeedHeading = () => {

    const [rotateArrow, setRotateArrow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("click", () => { setRotateArrow(false) })

        return () => {
            window.removeEventListener("click", () => { setRotateArrow(false) })
        }

    }, [])

    return (
        <div onClick={e => e.stopPropagation()} className='w-full h-[32px] flex justify-between relative'>
            <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Feed</p>
            <MyImage onClick={() => setRotateArrow(!rotateArrow)} src={addIcon} className={`w-[32px] h-[32px] ${!rotateArrow ? "rotate-0" : "-rotate-90"} transition-all duration-500`} alt="icon" />

            {/* options to create post and search user */}

            <div className={`w-[200px] h-fit absolute top-[32px] right-[8px] flex-col gap-2 bg-bgFilterPop py-2 cursor-pointer rounded-xl ${!rotateArrow ? "hidden" : "flex"} z-10 p-2`}>
                <div onClick={() => navigate("/home/createPost?type=add")} className='flex items-center gap-2 hover:bg-blue-600'>
                    <MyImage src={addIcon} className={"w-[20px] h-[20px]"} />
                    <p>Create Post</p>
                </div>

                <div onClick={() => setShowSearch(true)} className='flex items-center gap-2 hover:bg-blue-600'>
                    <MyImage src={searchIcon} className={"w-[20px] h-[20px]"} />
                    <p>Search User</p>
                </div>

            </div>

            {/* SEARCH SUER */}
            <SearchUser show={showSearch} setShow={setShowSearch} setRotateArrow={setRotateArrow} />

        </div>
    )
}

export default FeedHeading