import React, { useState } from 'react'
import VideoPop from './popups/VideoPop';

const YoutubeCard = ({ video }) => {

    const [show, setShow] = useState(false);

    return (
        <div onClick={() => setShow(!show)} className='max-[405px]:w-full w-[47%] sm:w-[45%] md:w-[calc(100vw/3.2)] lg:w-[calc(100vw/4.5)] overflow-hidden flex flex-col gap-2 text-white'>

            <div className='w-full md:w-[calc(100vw/3.2)] lg:w-[calc(100vw/4.5)] aspect-auto md::aspect-video'><img loading="lazy" src={video?.thumbnails[0]?.url} alt="" /></div>

            <div className='flex items-center gap-2'>
                <img loading="lazy"
                    className="object-cover flex w-5 h-5 rounded-full overflow-hidden"
                    src={video?.author?.avatar[0]?.url}
                />
                <p>{video?.author?.title}</p>
            </div>

            <p className='w-full text-ellipsis line-clamp-1'>{video?.title}</p>

            <p className='line-clamp-2 text-[12px]'>{video?.descriptionSnippet}</p>

            {show ? <VideoPop IdToFetchVideoDetail={video.videoId} setShow={setShow} /> : ""}
            
        </div>
    )
}

export default YoutubeCard