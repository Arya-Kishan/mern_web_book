import React from 'react'

const MyImage = ({ src, className, alt = "", imageClass = "", onClick = () => { }, handleImgLoadError = (err)=>{} }) => {
    return (
        <div onClick={onClick} className={className}>
            <img loading='lazy' className={`w-full h-full ${imageClass}`} src={src} alt={alt} srcSet="" onError={(err) => handleImgLoadError(err)} />
        </div>
    )
}

export default MyImage