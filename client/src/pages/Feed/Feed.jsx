import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import PostCard from '../../components/globalCards/PostCard'
import InfiniteScrollComp from '../../components/InfiniteScrollComp'
import { allowedLimit } from '../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectGetAllPosts, setAllPosts } from '../../Redux/Feed/FeedSlice'
import { getAllPostsAsync } from '../../services/FeedApi'
import FeedHeading from '../../components/FeedComp/FeedHeading'
import FeedFilter from '../../components/FeedComp/FeedFilter'

let page = 1;
const Feed = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const allPosts = useSelector(selectGetAllPosts);

    const getPosts = async () => {
        let posts = await getAllPostsAsync({ limit: allowedLimit, page: 1 });
        setData(posts);
        dispatch(setAllPosts(posts));
    }

    const handleNext = async () => {
        console.log("fetch next");
        page = page + 1;
        console.log(query);
        let posts = await getAllPostsAsync({ limit: allowedLimit, page: page, query: query ?? "" })
        if (posts.length > 0) {
            setData([...data, ...posts]);
            dispatch(setAllPosts([...allPosts, ...posts]));
        }
    }

    useEffect(() => {
        page = 1;
    }, [query])

    useEffect(() => {
        if (page == 1) {
            getPosts();
        }
    }, [])

    return (
        <div className='w-full h-full flex flex-col gap-4 relative'>

            <FeedHeading />

            <FeedFilter query={query} setQuery={setQuery} page={page} />

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

        </div>
    )
}

export default Feed