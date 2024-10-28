import React, { useEffect, useState } from 'react'

const DotToggle = ({ onChange = () => { }, selected = "off" }) => {
    
    const [toggle, setToggle] = useState(false);

    const handleChange = (word) => {
        onChange(word);
        if (word == "off") {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    useEffect(() => {
        if (selected == "off") {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }, [selected])

    return (
        <div className={`w-[50px] h-[25px] bg-bgInput1 rounded-2xl flex items-center gap-1 p-1 shadow-md  ${toggle ? "shadow-bg-card" : "shadow-transparent"} `}>

            <div onClick={() => handleChange("off")} className={`w-[20px] h-[20px] rounded-full ${!toggle ? "bg-customGreen" : "bg-transparent"}`}></div>

            <div onClick={() => handleChange("on")} className={`w-[20px] h-[20px] rounded-full ${toggle ? "bg-customGreen" : "bg-transparent"}`}></div>

        </div>
    )
}

export default DotToggle