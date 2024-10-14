import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import filterIcon from "../../assets/icons/filterIcon.svg"
import arrowIcon from "../../assets/arrow.svg"
import { useGetAllPostsQuery } from '../../Redux/Post/postApi'
import Loader from '../../components/Loader'
import PostCard from '../../components/globalCards/PostCard'
import { useNavigate } from 'react-router-dom'
import SearchUser from '../../components/FeedComp/SearchUser'

const Feed = () => {
    const [postsData, setPostsData] = useState();
    const [rotateArrow, setRotateArrow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const navigate = useNavigate();

    const { data: allPosts, allPostsLoading, isSuccess } = useGetAllPostsQuery();

    useEffect(() => {
        if (isSuccess) {
            setPostsData(allPosts)
        }
    }, [isSuccess, allPosts])

    useEffect(() => {
        window.addEventListener("click", () => { setRotateArrow(false) })

        return () => {
            window.removeEventListener("click", () => { setRotateArrow(false) })
        }

    }, [])

    return (
        <div className='w-full h-full flex flex-col relative'>

            <div onClick={e => e.stopPropagation()} className='w-full h-[32px] flex justify-between relative'>
                <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Feed</p>
                <MyImage onClick={() => setRotateArrow(!rotateArrow)} src={arrowIcon} className={`w-[32px] h-[32px] ${!rotateArrow ? "rotate-0" : "-rotate-90"} transition-all duration-500`} alt="icon" />

                {/* options to create post and search user */}

                <div className={`w-[200px] h-[200px] absolute top-[32px] right-[8px] flex-col bg-bgFilterPop py-2 cursor-pointer rounded-xl ${!rotateArrow ? "hidden" : "flex"} z-10`}>
                    <p onClick={() => navigate("/home/createPost?type=add")} className='hover:bg-blue-600 px-2'>Create Post</p>
                    <p onClick={() => setShowSearch(true)} className='hover:bg-blue-600 px-2'>Searc User</p>
                </div>

            </div>

            <div className='w-full h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start content-start items-start gap-5 pt-5'>
                {
                    !postsData
                        ?
                        <Loader />
                        :
                        postsData.length < 1
                            ?
                            <div className='w-full h-full flex justify-center items-center'>NO POSTS</div>
                            :
                            postsData?.map((e) => (<PostCard key={e._id} post={e} />))
                }
            </div>

            <SearchUser show={showSearch} setShow={setShowSearch} setRotateArrow={setRotateArrow} />


        </div>
    )
}

export default Feed