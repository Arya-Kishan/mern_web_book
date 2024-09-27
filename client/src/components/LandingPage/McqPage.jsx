import React from 'react'
import puzzleIcon from '../../assets/puzzle.svg'
import threeDotIcon from '../../assets/threeDot.svg'
import MyImage from '../MyImage'
const McqPage = () => {
    const mcqs = [
        {
            title: "Mcq's",
            description: "Solve Mcq's on different Topics or add yours"
        },
        {
            title: 'Express',
            description: "Express Mcq's on Express"
        },
        {
            title: 'Javascript',
            description: "Javascript Mcq's on Javascript"
        },
        {
            title: 'Output',
            description: "Practice output question in JS"
        },
    ]
    return (
        <div className='w-[100vw] h-screen flex justify-center items-center bg-[#010037]'>
            <div className='w-[80%] h-[80%] flex flex-wrap justify-center items-center gap-1 sm:gap-5 bg-blue-800 rounded-xl p-2  shadow-md shadow-white'>

                {mcqs.map((mcq, i) => (
                    <div key={i} className='flex flex-col gap-3 justify-evenly items-start bg-gradient-to-r from-blue-900 to-bg-card rounded-lg w-full sm:w-[48%] h-[20%] sm:h-[200px] p-2 text-[14px]'>

                        <div className='w-full flex gap-2 items-center justify-between relative'>

                            <div className='flex items-center gap-2'>
                                <MyImage className={"w-[30px] h-[30px]"} src={puzzleIcon} alt="" />
                                <p className='line-clamp-1'>{mcq.title}</p>
                            </div>

                            <MyImage className={"w-[30px] h-[30px]"} src={threeDotIcon} alt="" />

                        </div>

                        <div className='line-clamp-2 hidden sm:block'>{mcq.description}</div>

                        <div className='w-full flex justify-start items-center'>
                            <button className='w-[100px] text-textColor4 font-semibold bg-bgBtn1 p-2 rounded-lg'>Check Mcq</button>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default McqPage