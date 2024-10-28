import React, { useEffect, useState } from 'react'
import MyImage from '../../components/MyImage'
import bars1Icon from "../../assets/bars1.svg"
import DotToggle from '../../components/Toggle/DotToggle'
import { allowedLimit, tags } from '../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectGetAllPosts, setAllPosts } from '../../Redux/Feed/FeedSlice'
import { getAllPostsAsync } from '../../services/FeedApi'


const FeedFilter = ({ query, setQuery }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState("");
    const [showTags, setShowTags] = useState(true);
    const [selectedTags, setSelectedTags] = useState([])
    const dispatch = useDispatch();
    const allPosts = useSelector(selectGetAllPosts);

    const handleTags = async (tag) => {
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
        setFilter(`&tags=${tags}`);

        dispatch(setAllPosts([]));
        let posts = await getAllPostsAsync({ limit: allowedLimit, page: 1, query: `&tags=${tags}` })
        dispatch(setAllPosts(posts));
    }


    const handleToggleTags = (word) => {
        if (word == "on") {
            setShowTags(true)
        } else {
            setShowTags(false)
        }
    }

    const handleToggleLiked = (word) => {

        let a = [...allPosts];
        a.sort(function (a, b) {
            console.log(a);
            return a.likes.length - b.likes.length
        });

        if (word == "off") {
            dispatch(setAllPosts(a));
        } else {
            dispatch(setAllPosts(a.reverse()));
        }
    }

    const handleToggleLatest = async (word) => {
        dispatch(setAllPosts([]));
        if (word == "on") {
            let posts = await getAllPostsAsync({ limit: allowedLimit, page: 1, query: `&sort=-1` })
            dispatch(setAllPosts(posts));
            setFilter(`&sort=-1`)
        } else {
            let posts = await getAllPostsAsync({ limit: allowedLimit, page: 1, query: `&sort=1` })
            dispatch(setAllPosts(posts));
            setFilter(`&sort=1`)
        }
    }

    useEffect(() => {
        setQuery(filter);
    }, [filter])

    return (
        <>

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

            {/* FILTER */}
            <MyImage onClick={() => setShowFilter(!showFilter)} src={bars1Icon} className={`w-[60px] h-[60px] transition-all duration-300 ${!showFilter ? "rotate-0" : "rotate-90"} fixed bottom-[90px] md:bottom-[40px] right-4 md:right-[40px] z-50 bg-[#00000060] rounded-full p-2`} alt="icon" />

            {
                showFilter
                &&
                <div onClick={() => setShowFilter(!showFilter)} className='w-full h-dvh fixed md:absolute top-0 left-0 bg-[#000000b0] flex justify-center items-center'>

                    <div onClick={e => e.stopPropagation()} className='w-[180px] h-fit p-2 absolute bottom-[150px] md:bottom-[130px] right-[60px] md:right-[40px]'>
                        <div className='flex flex-col justify-between items-start gap-4 px-1'>

                            <div className='w-full flex gap-1 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <p className=''>Tags</p>
                                </div>
                                <DotToggle onChange={handleToggleTags} selected='on' />
                            </div>

                            <div className='w-full flex gap-1 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <p className=''>Most Liked</p>
                                </div>
                                <DotToggle onChange={handleToggleLiked} />
                            </div>

                            <div className='w-full flex gap-1 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <p className=''>Latest</p>
                                </div>
                                <DotToggle onChange={handleToggleLatest} />
                            </div>

                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default FeedFilter