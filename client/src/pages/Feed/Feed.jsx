import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import addIcon from "../../assets/add.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
import { useGetAllPostsQuery } from '../../Redux/Post/postApi'
import Loader from '../../components/Loader'
import PostCard from '../../components/globalCards/PostCard'
import { useNavigate } from 'react-router-dom'
import SearchUser from '../../components/FeedComp/SearchUser'
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
    const [postsData, setPostsData] = useState([]);
    const [rotateArrow, setRotateArrow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("page=1&limit=2")
    const [page, setPage] = useState(1)
    const [slide, setSlide] = useState(false);

    const navigate = useNavigate();

    const { data: allPosts, isSuccess } = useGetAllPostsQuery({ query: query });

    useEffect(() => {
        if (isSuccess) {
            setPostsData(prev => [...prev, ...allPosts])
        }
    }, [isSuccess])

    useEffect(() => {
        if (page > 1) {
            setQuery(`page=${page}&limit=2`)
        }
    }, [page])

    useEffect(() => {
        window.addEventListener("click", () => { setRotateArrow(false); setSlide(false) })

        return () => {
            window.removeEventListener("click", () => { setRotateArrow(false); setSlide(false) })
        }

    }, [])

    return (
        <div className='w-full h-full flex flex-col relative'>

            <div onClick={e => e.stopPropagation()} className='w-full h-[32px] flex justify-between relative'>
                <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Feed</p>
                <MyImage onClick={() => setRotateArrow(!rotateArrow)} src={addIcon} className={`w-[32px] h-[32px] ${!rotateArrow ? "rotate-0" : "-rotate-90"} transition-all duration-500`} alt="icon" />

                {/* options to create post and search user */}

                <div className={`w-[200px] h-fit absolute top-[32px] right-[8px] flex-col gap-2 bg-bgFilterPop py-2 cursor-pointer rounded-xl ${!rotateArrow ? "hidden" : "flex"} z-10`}>
                    <div onClick={() => navigate("/home/createPost?type=add")} className='flex items-center gap-2 hover:bg-blue-600 px-2'>
                        <MyImage src={addIcon} className={"w-[20px] h-[20px]"} />
                        <p>Create Post</p>
                    </div>
                    <div onClick={() => setShowSearch(true)} className='flex items-center gap-2 hover:bg-blue-600 px-2'>
                        <MyImage src={searchIcon} className={"w-[20px] h-[20px]"} />
                        <p>Search User</p>
                    </div>
                </div>

            </div>

            <div id='scrollableDiv' className='w-full h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll'>

                <InfiniteScroll
                    dataLength={page * 2} //This is important field to render the next data
                    next={() => { setPage((prev) => prev + 1) }}
                    hasMore={postsData?.length < localStorage.getItem("x-total-count")}
                    loader={<Loader />}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p className='w-full text-center'>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                className='flex flex-wrap justify-start content-start items-start gap-5 pt-5'
                >
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
                </InfiniteScroll>
            </div>

            <SearchUser show={showSearch} setShow={setShowSearch} setRotateArrow={setRotateArrow} />

            {/* FILTER FEEDS */}
            <div onClick={e => e.stopPropagation()} className='arya w-[60px] h-[60px] fixed bottom-[90px] right-4 z-50 flex'>

                {slide && <div className='w-[200px] h-[300px] bg-red-500 absolute bottom-[85%] right-[85%] rounded-2xl'>
                    <p onClick={() => handleFilter(2)}>cute</p>
                    <p onClick={() => handleFilter(3)}>war</p>
                </div>}

                <MyImage onClick={() => setSlide(!slide)} src={addIcon} className={`w-[60px] h-[60px] transition-all duration-300 ${slide ? "rotate-0" : "rotate-90"} fixed bottom-[90px] right-4 z-50 bg-[#00000060] rounded-full`} alt="icon" />
            </div>



        </div>
    )
}

export default Feed