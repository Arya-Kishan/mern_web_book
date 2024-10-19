import React from 'react'
import { useGetSinglePostQuery } from '../../Redux/Post/postApi'
import Loader from '../../components/Loader';
import PostCard from '../../components/globalCards/PostCard';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
    const params = useParams();
    const { data: post } = useGetSinglePostQuery(params.postId);    

    return (
        !post
            ?
            <Loader />
            :
            <div className='w-full h-full flex justify-center items-center'>
                <PostCard post={post} />
            </div>
    )
}

export default SinglePost