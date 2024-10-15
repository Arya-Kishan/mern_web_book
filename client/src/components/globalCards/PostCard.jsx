import React, { useEffect, useState } from 'react'
import MyImage from '../MyImage'
import { getTimeAgo } from '../../helper/customFunction'
import LikeDislikeButton from '../globalCards/LikeDislikeButton'
import Comment from '../comments/Comment'
import SharePopUp from '../popups/SharePopUp'
import ReactPlayer from "react-player";
import ReactAudioPlayer from 'react-audio-player';
import ThreeDotPopUp from '../popups/ThreeDotPopUp'
import threeDotIcon from '../../assets/threeDot.svg'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { useSelector } from 'react-redux'

const PostCard = ({ post }) => {
  const [pop, setPop] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser)


  useEffect(() => {
    window.addEventListener("click", () => { setPop(false) })

    return () => {
      window.removeEventListener("click", () => { setPop(false) })
    }

  }, [])

  return (
    <div className='max-[400px]:w-full w-[46%] lg:w-[32%] h-fit bg-bgInput1 text-white text-[16px] flex flex-col justify-start gap-1 rounded-xl overflow-hidden'>

      {/* user info */}
      <div className='w-full flex items-center justify-between gap-1 p-1'>
        {/* image profile */}
        <div className='flex gap-2 items-center'>
          <MyImage src={`https://api.multiavatar.com/${post.userId.name}.svg`} className={"w-[40px] h-[40px]"} />

          <div className='flex flex-col gap-1'>
            <p className='font-bold'>{post.userId.name}</p>
            <p className='text-[12px]'>{getTimeAgo(post.createdAt)}</p>
          </div>
        </div>

        <div onClick={e => e.stopPropagation()} className='flex gap-1 items-center relative'>
          {
            post.userId._id == loggedInUser._id
            &&
            <MyImage src={threeDotIcon} onClick={(e) => { setPop(!pop) }} className={"w-[30px] h-[30px]"} />
          }

          {/* THREE DOT POP UP */}
          {!pop ? ""
            :
            <ThreeDotPopUp setPop={setPop} id={post?._id} public_id={post.file.file_public_id} contentType={"postCard"} content={post} />
          }
        </div>

      </div>

      {/* image */}
      <div className='w-full aspect-square bg-bgInput1 overflow-hidden'>

        {
          post.file.fileType == "image"
            ?
            <MyImage className={"w-full h-full"} imageClass='object-contain' src={post.file.fileUrl} />
            :
            post.file.fileType == "video"
              ?
              <ReactPlayer
                url={`${post.file.fileUrl}`}
                height="100%"
                width="100%"
                controls
                style={{ backgroundColor: "#000000" }}
                playing={false}
              />
              :
              <ReactAudioPlayer
                src={`${post.file.fileUrl}`}
                controls
              />
        }

      </div>

      {/* other details */}
      <div className='w-full flex-1 flex flex-col justify-between gap-4 p-2'>

        {/* tags */}
        <div className='w-full flex gap-2 cursor-pointer'>
          <LikeDislikeButton data={post} category="post" likedArr={post.likes} />
          <Comment details={post} category='post' />
          <SharePopUp link={`/home/post/${post._id}`} />
        </div>

        {/* title */}
        <div className='text-[16px] h-[48px] line-clamp-2'>
          <span className='font-bold '>{post.title}</span> <span>{post.description}</span>
        </div>

        <div className='flex gap-2'>
          {
            post.tags.slice(0, 3).map((e, i) => (
              <p key={i} className='w-fit px-2 uppercase text-[12px] bg-teal-800 rounded-lg'>#{e}</p>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default PostCard