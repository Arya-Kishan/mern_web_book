import React, { useEffect, useState } from 'react'

const SlideComponent = ({ children, slideUp = false }) => {

    const [slide, setSlide] = useState("top-full");
    const [show, setShow] = useState(false);

    useEffect(() => {

        if (slideUp) {
            setShow(true)
            setTimeout(() => {
                setSlide("top-0")
            }, 100);
        } else {
            setSlide("top-full")
            setTimeout(() => {
                setShow(false)
            }, 1000);
        }

    }, [slideUp])



    return (
        show && <div className={`w-full h-full transition-all duration-1000 absolute ${slide} left-0 bg-black/[0.9] sliderShadow`}>
            {children}
        </div>
    )
}

export default SlideComponent