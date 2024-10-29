import React, { useEffect, useState } from 'react'
import MainSlider from './MainSlider'
import UserHeading from '../UserHeading'
import { useGetSinglePostQuery } from '../../Redux/Post/postApi';
import { useGetSingleGlobalMcqQuery } from '../../Redux/GlobalMcq/GlobalMcqApi';
import { useGetSingleGlobalInterviewQuery } from '../../Redux/GlobalInterview/GlobalInterviewApi';
import Loader from '../Loader';

const LikedUser = ({ show, setShow, category, cardId }) => {

    const [data, setData] = useState(null);

    const { data: singlePostData, isLoading: singlePostDataLoading } = useGetSinglePostQuery(cardId, { skip: category !== "post" });

    const { data: singleMcqData, isLoading: singleMcqDataLoading } = useGetSingleGlobalMcqQuery(cardId, { skip: category !== "mcq" });

    const { data: singleInterviewData, isLoading: singleInterviewDataLoading } = useGetSingleGlobalInterviewQuery(cardId, { skip: category !== "interview" });

    useEffect(() => {
        setData(singlePostData || singleMcqData || singleInterviewData)
    }, [singleInterviewData, singleMcqData, singlePostData])


    return (
        <MainSlider show={show} setShow={setShow} height='50%'>
            <div className='w-full h-[calc(100dvh-167px)] flex flex-col gap-5 overflow-scroll'>
                {
                    singlePostDataLoading || singleInterviewDataLoading || singleMcqDataLoading
                        ?
                        <Loader />
                        :
                        data?.likes.length < 1
                            ?
                            <div className='w-full h-full flex justify-center items-center'>NO LIKES</div>
                            :
                            data?.likes.map((e) => (
                                <div key={e._id} className='w-full text-start flex gap-6 items-center'>
                                    <UserHeading name={e.name} userId={e._id} />
                                </div>
                            ))
                }
            </div>
        </MainSlider>
    )
}

export default LikedUser