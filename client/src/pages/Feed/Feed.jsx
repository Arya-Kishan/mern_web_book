import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import addIcon from "../../assets/add.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
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
                <MyImage onClick={() => setRotateArrow(!rotateArrow)} src={addIcon} className={`w-[32px] h-[32px] ${!rotateArrow ? "rotate-0" : "-rotate-90"} transition-all duration-500`} alt="icon" />

                {/* options to create post and search user */}

                <div className={`w-[200px] h-fit absolute top-[32px] right-[8px] flex-col gap-2 bg-bgFilterPop py-2 cursor-pointer rounded-xl ${!rotateArrow ? "hidden" : "flex"} z-10`}>
                    <p onClick={() => navigate("/home/createPost?type=add")} className='flex items-center gap-2 hover:bg-blue-600 px-2'>
                        <MyImage src={addIcon} className={"w-[20px] h-[20px]"} />
                        <p>Create Post</p>
                    </p>
                    <p onClick={() => setShowSearch(true)} className='flex items-center gap-2 hover:bg-blue-600 px-2'>
                        <MyImage src={searchIcon} className={"w-[20px] h-[20px]"} />
                        <p>Search User</p>
                    </p>
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