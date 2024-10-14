import React, { useEffect, useState } from 'react'
import cancelIcon from '../../assets/cancel.svg'
import MyImage from '../MyImage';

const MainSlider = ({ show, setShow, children }) => {

    const [slide, setSlide] = useState("top-full");
    const [show1, setShow1] = useState(false)


    // BELOW USEEFFECT USED FOR SLIDER PURPOSE
    useEffect(() => {

        if (show) {
            setShow1(true)
            setTimeout(() => {
                setSlide("top-0")
            }, 100);
        } else {
            setSlide("top-full")
            setTimeout(() => {
                setShow1(false)
            }, 500);
        }

    }, [show])


    return (
        show1 && <div className={`w-full h-full transition-all duration-500 absolute ${slide} left-0 bg-black/[0.9] sliderShadow z-50 absolute`}>
            <div onClick={() => setShow(false)} className='w-full h-[80px] p-2 flex justify-center items-center'>
                <MyImage className={"w-[60px] h-[60px]"} src={cancelIcon} alt="" />
            </div>
            {children}
        </div>
    )
}

export default MainSlider