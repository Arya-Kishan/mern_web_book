import React from 'react'

const MyImage = ({ src, className, alt = "", onClick = () => { } }) => {
    return (
        <div onClick={onClick} className={className}>
            <img loading='lazy' className="w-full h-full" src={src} alt={alt} srcSet="" />
        </div>
    )
}

export default MyImage