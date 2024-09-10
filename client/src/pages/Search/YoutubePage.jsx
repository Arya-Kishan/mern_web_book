import React from 'react'
import YoutubeCard from '../../components/YoutubeCard';

const YoutubePage = ({ result }) => {

  return (
    <div className='overflow-scroll flex flex-wrap gap-4'>
      {result?.length > 0 ?
        result?.map((item, index) => {
          if (item?.type !== "video") return false;
          return <YoutubeCard key={index} video={item?.video} />;
        })
        : ''}
    </div>
  )
}

export default YoutubePage