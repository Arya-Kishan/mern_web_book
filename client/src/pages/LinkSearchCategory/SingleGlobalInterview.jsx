import React from 'react'
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { useGetSingleGlobalInterviewQuery } from '../../Redux/GlobalInterview/GlobalInterviewApi';
import GlobalInterviewCard from '../../components/globalCards/GlobalInterviewCard';

const SingleGlobalInterview = () => {
    const params = useParams();
    console.log(params);

    const { data, isLoading } = useGetSingleGlobalInterviewQuery(params.interviewId)
    console.log(data);


    return (
        isLoading && !data
            ?
            <Loader />
            :
            <div className='w-full h-full flex justify-center items-center'>
                <GlobalInterviewCard interview={data} />
            </div>
    )
}

export default SingleGlobalInterview