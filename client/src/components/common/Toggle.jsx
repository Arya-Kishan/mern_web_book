import React, { useState } from 'react'

const Toggle = ({ buttonsArr = ["Text 1", "Text 2", "Text 3"], onChange = () => { }, bgColor = "bg-blue-500", buttonColor = "bg-transparent" }) => {

    const [data, setData] = useState(buttonsArr[0])

    const handleClick = (word) => {
        setData(word)
        onChange(word);
    }

    return (
        <div className={`w-fit flex gap-2 items-center ${bgColor} p-[4px] rounded-[50px]`}>
            {
                buttonsArr.map((e, i) => <div
                    key={e}
                    onClick={() => handleClick(e)}
                    className={`w-[60px]  md:w-[100px] text-[10px] md:text-[14px] p-1 ${e == data ? 'bg-green-500' : buttonColor} font-semibold text-center capitalize rounded-[50px] cursor-pointer hover:text-white`}>
                    {e}
                </div>)
            }
        </div>
    )
}

export default Toggle