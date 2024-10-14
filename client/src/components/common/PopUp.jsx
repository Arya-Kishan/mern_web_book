import React, { memo } from 'react'

const PopUp = ({ show = true, setShow, children, height = "80vh", width = "w-[80vw]", bg = "bg-blue-700" }) => {
    return (
        show
        &&
        <div onClick={() => setShow(false)} className='w-full h-dvh fixed top-0 left-0 flex justify-center items-center bg-[#000000a4] z-50'>

            <div onClick={e => e.stopPropagation()} className={`${width} ${bg} flex flex-col justify-center items-center gap-5 rounded-lg p-2`} style={{ height: height }}>
                {children}
            </div>

        </div>
    )
}

export default PopUp