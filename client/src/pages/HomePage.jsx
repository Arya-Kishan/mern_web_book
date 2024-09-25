import React from 'react';
import { useState } from 'react'

import hamIcon from '../assets/ham.svg'
import cancelIcon from '../assets/cancel.svg'

import LeftHome from './HomePage/LeftHome';
import RightHome from './HomePage/RightHome';

const HomePage = () => {

  const [slide, setSlide] = useState(true);

  return (
    <div>
      <div className='w-full h-dvh flex gap-5 bg-[#0A0A46] p-0 md:p-6 text-white'>

        <LeftHome slide={slide} setSlide={setSlide} />

        {/* RIGHT SIDE */}
        <RightHome />

      </div>

      <img loading="lazy" onClick={() => setSlide(!slide)} src={!slide ? cancelIcon : hamIcon} className='fixed bottom-5 right-2 block md:hidden w-[60px] h-[60px] z-50' alt="" srcSet="" />

    </div >
  )
}

export default HomePage