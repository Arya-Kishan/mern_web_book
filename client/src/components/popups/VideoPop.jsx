import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import Loader from '../Loader';
import useSearchApi from '../../hooks/useSearchApi';
import PopUp from '../common/PopUp';

const VideoPop = ({ IdToFetchVideoDetail, setShow }) => {

    const { videoDetail } = useSearchApi();
    const [id, setId] = useState(null);

    const fetchDetail = async () => {
        let res = await videoDetail(IdToFetchVideoDetail);
        let { videoId } = res;
        setId(videoId);
    }

    useEffect(() => {
        fetchDetail();
    }, [])

    return (
        <PopUp setShow={setShow} height='60%' >

            {id ? <div className='w-full h-full'>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    height="100%"
                    width="100%"
                    controls
                    style={{ backgroundColor: "#000000" }}
                    playing={true}
                />
            </div> : <div className='w-full h-full flex justify-center items-center'><Loader /></div>}

        </PopUp>
    )
}

export default VideoPop