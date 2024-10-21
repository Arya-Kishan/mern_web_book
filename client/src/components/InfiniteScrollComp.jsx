import React, { useState } from 'react'
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComp = ({ children, dataLength, next, hasMore, scrollableTarget, className }) => {

    return (
        <InfiniteScroll
            dataLength={dataLength} //This is important field to render the next data
            next={next}
            hasMore={hasMore}
            loader={<Loader />}
            scrollableTarget={scrollableTarget}
            endMessage={<p className='w-full text-center'>Yay! You have seen all</p>}
            className={className}
        >
            {children}
        </InfiniteScroll>
    )
}

export default InfiniteScrollComp