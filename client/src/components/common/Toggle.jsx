import React, { useEffect, useState } from 'react'
import personalIcon from "../../assets/personal.svg"
import globeIcon from "../../assets/globe.svg"
import MyImage from '../MyImage'

const Toggle = ({
    buttonsArr = [{ text: "personal", pic: personalIcon }, { text: "global", pic: globeIcon }],
    onChange = () => { },
    buttonColor = "bg-transparent",
    selectedWord = buttonsArr[0].text,

}) => {

    const [data, setData] = useState(selectedWord)

    const handleClick = (word) => {
        setData(word.text)
        onChange(word.text);
    }

    useEffect(() => {
        setData(selectedWord)
    }, [selectedWord])

    return (
        buttonsArr.map((e, i) => (
            <div
                key={i}
                onClick={() => handleClick(e)}
                className={`w-[60px]  md:w-[100px] text-[11px] md:text-[14px] p-1 ${e.text == data ? 'bg-bgHistoryPop' : buttonColor} font-semibold text-center capitalize rounded-[50px] cursor-pointer hover:text-white flex items-center justify-center gap-1`}>
                {e.pic && <MyImage src={e.pic} className={"w-[20px] h-[20px]"} />}
                <p className='hidden md:block'>{e.text}</p>
            </div>
        ))
    )
}

export default Toggle