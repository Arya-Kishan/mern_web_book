import React, { useState } from 'react'

const OptionButton = ({ optionsArr, answer }) => {

    return (
        <>
            {optionsArr?.map((item) => (
                <OptionBox key={item} word={item} answer={answer} />
            ))}
        </>
    )
}

export default OptionButton

const OptionBox = ({ word, answer }) => {

    const [correct, setCorrect] = useState("");

    return (
        <div onClick={() => setCorrect(word)} className={`w-full p-2  ${correct == "" ? "bg-blue-500" : correct == answer ? "bg-green-500" : "bg-red-600"} rounded-lg`}>{word}</div>
    )
}