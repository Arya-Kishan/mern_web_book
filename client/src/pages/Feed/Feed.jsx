import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import filterIcon from "../../assets/icons/filterIcon.svg"
import arrowIcon from "../../assets/arrow.svg"
import { useGetAllPostsQuery } from '../../Redux/Post/postApi'
import Loader from '../../components/Loader'
import PostCard from '../../components/globalCards/PostCard'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const [postsData, setPostsData] = useState();
    const [rotateArrow, setRotateArrow] = useState(false);

    const navigate = useNavigate();

    const { data: allPosts, allPostsLoading, isSuccess } = useGetAllPostsQuery();

    useEffect(() => {
        if (isSuccess) {
            setPostsData(allPosts)
        }
    }, [isSuccess])

    return (
        <div className='w-full h-full flex flex-col'>

            <div className='w-full h-[32px] flex justify-between relative'>
                <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Feed</p>
                <MyImage onClick={() => setRotateArrow(!rotateArrow)} src={arrowIcon} className={`w-[32px] h-[32px] ${!rotateArrow ? "rotate-0" : "-rotate-90"} transition-all duration-500`} alt="icon" />

                {/* options to create post and search user */}

                <div className={`w-[200px] h-[200px] absolute top-[32px] right-[8px] flex-col bg-bgFilterPop py-2 cursor-pointer rounded-xl ${!rotateArrow ? "hidden" : "flex"}`}>
                    <p onClick={() => navigate("/home/createPost?type=add")} className='hover:bg-blue-600 px-2'>Create Post</p>
                    <p className='hover:bg-blue-600 px-2'>Searc User</p>
                </div>

            </div>

            <div className='w-full h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start content-start items-start gap-5 pt-5'>
                {
                    allPostsLoading
                        ?
                        <Loader />
                        :
                        postsData?.map((e) => (<PostCard key={e._id} post={e} />))
                }
            </div>


        </div>
    )
}

export default Feed