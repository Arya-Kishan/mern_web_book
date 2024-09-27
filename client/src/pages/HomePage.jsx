import React from 'react';
import { useState } from 'react'

import hamIcon from '../assets/ham.svg'
import cancelIcon from '../assets/cancel.svg'

import LeftHome from './HomePage/LeftHome';
import RightHome from './HomePage/RightHome';
import MyImage from '../components/MyImage';

const HomePage = () => {

  const [slide, setSlide] = useState(true);

  return (
    <div>
      <div className='w-full h-dvh flex gap-5 bg-[#0A0A46] p-0 md:p-6 text-white'>

        <LeftHome slide={slide} setSlide={setSlide} />

        {/* RIGHT SIDE */}
        <RightHome />

      </div>

      <MyImage onClick={() => setSlide(!slide)} src={!slide ? cancelIcon : hamIcon} className='w-[60px] h-[60px] fixed bottom-5 right-3 block md:hidden z-50' alt="icon" />

    </div >
  )
}

export default HomePage