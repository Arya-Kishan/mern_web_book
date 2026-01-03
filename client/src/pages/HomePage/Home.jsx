import React, { useContext } from 'react';
import { useState } from 'react'

import hamIcon from '../../assets/ham.svg'

import LeftHome from './LeftHome';
import RightHome from './RightHome';
import MyImage from '../../components/MyImage';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../Context/SocketContext';

const Home = () => {

    const [slide, setSlide] = useState(true);
    const paths = useLocation();

    return (
        <div>
            <div className='w-full h-dvh flex gap-5 bg-[#0A0A46] p-0 md:p-6 text-white'>

                <LeftHome slide={slide} setSlide={setSlide} />

                {/* RIGHT SIDE */}
                <RightHome />

            </div>

        </div >
    )
}

export default Home