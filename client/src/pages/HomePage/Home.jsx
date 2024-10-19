import React from 'react';
import { useState } from 'react'

import hamIcon from '../../assets/ham.svg'
import cancelIcon from '../../assets/cancel.svg'

import LeftHome from './LeftHome';
import RightHome from './RightHome';
import MyImage from '../../components/MyImage';
import { useLocation } from 'react-router-dom';

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

            {
                !(paths.pathname.search("chat") !== -1)
                &&
                <MyImage onClick={() => setSlide(!slide)} src={hamIcon} className={`w-[60px] h-[60px] transition-all duration-300 ${slide ? "rotate-0" : "rotate-90"} fixed bottom-6 right-4 block md:hidden z-50 bg-[#00000060] rounded-full p-2`} alt="icon" />
            }

        </div >
    )
}

export default Home