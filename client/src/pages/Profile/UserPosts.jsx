import React from 'react'
import { useGetUserPostsQuery } from '../../Redux/Post/postApi'
import PostCard from '../../components/globalCards/PostCard';

const UserPosts = ({ userId }) => {

    const { data } = useGetUserPostsQuery(userId);
    console.log(data);

    return (
        <div className='w-full min-h-[100px] h-fit pt-5'>

            <p className='w-full text-[20px] font-bold' >Posts</p>

            <div className='w-full h-full pt-10 flex gap-4 justify-center flex-wrap'>
                {data?.map((e) => (
                    <PostCard post={e} />
                ))}
            </div>

        </div>
    )
}

export default UserPosts