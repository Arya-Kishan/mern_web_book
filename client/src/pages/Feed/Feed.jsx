import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import addIcon from "../../assets/add.svg"
import filterIcon from "../../assets/icons/filterIcon.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
import { useGetAllPostsQuery } from '../../Redux/Post/postApi'
import Loader from '../../components/Loader'
import PostCard from '../../components/globalCards/PostCard'
import { useNavigate } from 'react-router-dom'
import SearchUser from '../../components/FeedComp/SearchUser'
import InfiniteScrollComp from '../../components/InfiniteScrollComp'
import { allowedLimit } from '../../Constants'
import debounce from "lodash.debounce"
import Toggle from '../../components/common/Toggle'

const Feed = () => {
    const [postsData, setPostsData] = useState([]);
    const [rotateArrow, setRotateArrow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [tags, setTags] = useState(["action", "adventure", "air", "war", "cute", "family", "happy", "anime", "react", "study"]);
    const [showTags, setShowTags] = useState(false);
    const [selectedTags, setSelectedTags] = useState([])
    const [query, setQuery] = useState(`page=1&limit=${allowedLimit}`)
    const [page, setPage] = useState(1)
    const [slide, setSlide] = useState(false);

    const navigate = useNavigate();

    const { data: allPosts, isSuccess, isLoading } = useGetAllPostsQuery({ query: query });

    const handleTags = (tag) => {
        setSelectedTags(prev => [...prev, tag])
        setPage(prev => 1);
        setPostsData([]);
    }

    const handleNext = debounce(() => {
        setPage((prev) => prev + 1)
    }, 2000)

    useEffect(() => {
        if (isSuccess) {
            setPostsData(prev => [...prev, ...allPosts])
        }
    }, [allPosts])

    useEffect(() => {
        if (!isLoading) {
            setQuery(`page=${page}&limit=${allowedLimit}${selectedTags.length > 0 ? "&tags=" + selectedTags : ""}`)
        }
    }, [page])

    useEffect(() => {
        window.addEventListener("click", () => { setRotateArrow(false); setSlide(false) })

        return () => {
            window.removeEventListener("click", () => { setRotateArrow(false); setSlide(false) })
        }

    }, [])

    const handleToggleTags = (word) => {
        if (word == "on") {
            setShowTags(true)
        } else {
            setShowTags(false)
        }

    }

    return (
        <div className='w-full h-full flex flex-col gap-4 relative'>

            {/* POSTS HEADING */}
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
                    <div className='bg-red-600 flex flex-col gap-2 p-1'>
                        <p className='font-bold text-[18px]'>Tags</p>
                        <div className='flex'>
                            <Toggle buttonsArr={[{ text: "off", pic: "" }, { text: 'on', pic: "" }]} onChange={handleToggleTags} />
                        </div>
                    </div>
                </div>

            </div>

            <div className={`w-full h-[${showTags ? "40px" : "0px"}] transition-all duration-700 overflow-hidden relative`}>
                <div className={`w-full h-full flex items-center gap-2 absolute top-0 left-0 overflow-x-scroll`}>

                    {tags.map((e, i) => (
                        <p key={i} onClick={() => handleTags(e)} className={`w-[100px] text-[14px] p-[4px] capitalize rounded-2xl ${selectedTags.includes(e) ? "bg-red-800" : "bg-transparent border-2 border-white"} text-center shrink-0`}>
                            {e}
                        </p>
                    ))}

                </div>
            </div>

            {/* INFINITE SCROLL POSTS */}
            <div id='scrollableDiv' className='w-full h-full overflow-scroll'>
                <InfiniteScrollComp
                    dataLength={page * allowedLimit} //This is important field to render the next data
                    next={handleNext}
                    hasMore={postsData?.length < localStorage.getItem("x-total-count")}
                    scrollableTarget="scrollableDiv"
                    className='flex flex-wrap justify-start content-start items-start gap-5'
                >
                    {
                        isLoading
                            ?
                            <Loader />
                            :
                            postsData.length < 1
                                ?
                                <div className='w-full h-full flex justify-center items-center'>NO POSTS</div>
                                :
                                postsData?.map((e) => (<PostCard key={e._id} post={e} />))
                    }
                </InfiniteScrollComp>
            </div>

            {/* SEARCH SUER */}
            <SearchUser show={showSearch} setShow={setShowSearch} setRotateArrow={setRotateArrow} />


        </div>
    )
}

export default Feed