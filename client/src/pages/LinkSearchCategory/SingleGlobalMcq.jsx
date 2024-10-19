import React from 'react'
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { useGetSingleGlobalMcqQuery } from '../../Redux/GlobalMcq/GlobalMcqApi';
import GlobalMcqCard from '../../components/globalCards/GlobalMcqCard';

const SingleGlobalMcq = () => {
    const params = useParams();
    console.log(params);

    const { data, isLoading } = useGetSingleGlobalMcqQuery(params.mcqId)
    console.log(data);


    return (
        isLoading && !data
            ?
            <Loader />
            :
            <div className='w-full h-full flex justify-center items-center'>
                <GlobalMcqCard mcq={data} />
            </div>
    )
}

export default SingleGlobalMcq