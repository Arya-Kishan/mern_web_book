import React, { useEffect, useRef } from 'react'
import MyImage from '../MyImage';
import sendIcon from "../../assets/send.svg"

const InputMessage = ({ onSend = () => { }, clearMessages }) => {

    const inputRef = useRef("");

    const handleSend = () => {
        onSend(inputRef.current.value)
    }

    useEffect(() => {
        inputRef.current.value = ""
    }, [clearMessages])

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            handleSend()
        }
    }

    return (
        <div className='w-full h-[50px] bg-transparent flex items-center justify-between border-2 rounded-[20px] p-2'>
            <input
                ref={inputRef}
                onKeyUp={handleEnter}
                type="text"
                className='w-full h-full text-[16px] bg-transparent'
                placeholder='write your message ...'
            />
            <MyImage src={sendIcon} className={"w-[30px] h-[30px]"} onClick={handleSend} imageClass='-rotate-45 p-[2px]' />
        </div>
    )
}

export default InputMessage