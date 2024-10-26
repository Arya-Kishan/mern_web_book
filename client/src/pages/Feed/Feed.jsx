import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import addIcon from "../../assets/add.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
import Loader from '../../components/Loader'
import PostCard from '../../components/globalCards/PostCard'
import { useNavigate } from 'react-router-dom'
import SearchUser from '../../components/FeedComp/SearchUser'
import InfiniteScrollComp from '../../components/InfiniteScrollComp'
import { allowedLimit, tags } from '../../Constants'
import DotToggle from '../../components/Toggle/DotToggle'
import { useDispatch, useSelector } from 'react-redux'
import { selectGetAllPosts, setAllPosts } from '../../Redux/Feed/FeedSlice'
import { getAllPostsAsync } from '../../services/FeedApi'

let page = 1;
const Feed = () => {

    const dispatch = useDispatch();
    const [rotateArrow, setRotateArrow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [selectedTags, setSelectedTags] = useState([])
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const allPosts = useSelector(selectGetAllPosts);

    const getPosts = async () => {
        let posts = await getAllPostsAsync({ limit: allowedLimit, page: 1 });
        setData(posts);
        dispatch(setAllPosts(posts));
    }

    const handleNext = async () => {
        console.log("fetch next");
        page = page + 1;
        let posts = await getAllPostsAsync({ limit: allowedLimit, page: page, query: selectedTags.length > 0 ? selectedTags : '' })
        if (posts.length > 0) {
            setData([...data, ...posts]);
            dispatch(setAllPosts([...allPosts, ...posts]));
        }
    }


    const handleTags = async (tag) => {
        page = 1;
        let tags = [];
        if (selectedTags.includes(tag)) {
            let index = selectedTags.findIndex((e) => e === tag);
            selectedTags.splice(index, 1);
            tags = selectedTags;
        } else {
            tags = [...selectedTags, tag];
        }
        console.log(tags);
        setSelectedTags([...tags]);

        dispatch(setAllPosts([]));
        let posts = await getAllPostsAsync({ limit: allowedLimit, page: 1, query: tags })
        dispatch(setAllPosts(posts));
    }

    useEffect(() => {
        window.addEventListener("click", () => { setRotateArrow(false) })
        if (page == 1) {
            getPosts();
        }

        return () => {
            window.removeEventListener("click", () => { setRotateArrow(false) })
        }

    }, [])

    const handleToggleTags = (word) => {
        if (word == "on") {
            setShowTags(true)
        } else {
            setShowTags(false)
        }
    }

    console.log(selectedTags);

    return (
        <div className='w-full h-full flex flex-col gap-4 relative'>

            {/* POSTS HEADING */}
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
                    <div className='flex justify-between items-center gap-2 px-1'>
                        <div className='flex gap-2 items-center'>
                            <MyImage src={searchIcon} className={"w-[20px] h-[20px]"} />
                            <p className=''>Tags</p>
                        </div>
                        <DotToggle onChange={handleToggleTags} />
                    </div>
                </div>

            </div>

            {/* TAGS */}
            <div className={`w-full h-[${showTags ? "40px" : "0px"}] transition-all duration-700 overflow-hidden relative`}>
                <div className={`w-full h-full flex items-center gap-4 absolute top-0 left-0 overflow-x-scroll`}>

                    {tags.map((e, i) => (
                        <p key={i} onClick={() => handleTags(e)} className={`w-[80px] text-[12px] px-[4px] py-1 capitalize rounded-2xl ${selectedTags.includes(e) ? "bg-red-800" : "bg-transparent border-2 border-white"} text-center shrink-0`}>
                            {e}
                        </p>
                    ))}

                </div>
            </div>

            {/* INFINITE SCROLL POSTS */}
            <div id='scrollableDiv' className='w-full h-full overflow-scroll'>
                <InfiniteScrollComp
                    dataLength={allPosts.length} //This is important field to render the next data
                    next={handleNext}
                    hasMore={allPosts?.length < localStorage.getItem("x-total-count")}
                    scrollableTarget="scrollableDiv"
                    className='flex flex-wrap justify-start content-start items-start gap-5'
                >
                    {
                        !allPosts
                            ?
                            <Loader />
                            :
                            allPosts.length < 1
                                ?
                                <div className='w-full h-full flex justify-center items-center'>NO POSTS</div>
                                :
                                allPosts?.map((e) => (<PostCard key={e._id} post={e} />))
                    }
                </InfiniteScrollComp>
            </div>

            {/* SEARCH SUER */}
            <SearchUser show={showSearch} setShow={setShowSearch} setRotateArrow={setRotateArrow} />


        </div>
    )
}

export default Feed