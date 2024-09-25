import React from 'react'
import chessIcon from '../../assets/chess.svg'
import threeDotIcon from '../../assets/threeDot.svg'

const InterviewPage = () => {
    const interviews = [
        {
            title: 'Interview Questions',
            description: "Create or Check others shared Interview questions",
        },
        {
            title: 'React',
            description: "Questions on React",
        },
        {
            title: 'Mongo DB',
            description: "Questions on Mongo DB",
        },
    ]
    return (
        <div className='w-[100vw] h-screen flex justify-center items-center'>
            <div className='w-[80%] h-[80%] flex flex-wrap justify-center items-center gap-5 bg-blue-800 rounded-xl p-2  shadow-md shadow-white'>

                {interviews.map((interview, i) => (
                    <div key={i} className='flex flex-col gap-3 justify-evenly items-start bg-bg-card w-[70%] sm:w-[30%] h-[30%] sm:h-[300px] p-4 rounded-lg text-[14px]'>

                        <div className='w-full flex justify-end items-center relative'>

                            <img loading="lazy" className='w-[20px] sm:w-[30px]' src={threeDotIcon} alt="" srcSet="" />

                        </div>

                        <div className='w-full flex justify-center items-center'>
                            <img loading="lazy" className='bg-white rounded-full p-2' src={chessIcon} alt="" />
                        </div>

                        <p className='w-full font-bold text-xl text-center line-clamp-1 hidden sm:block'>{interview?.title}</p>

                        <p className='w-full text-center line-clamp-2 hidden sm:block'>{interview?.description}</p>

                        <div className='w-full flex justify-center items-center'>
                            <button className='p-2 bg-btnColor1 w-[100px] rounded-lg text-[12px] sm:text-xl'>Interview</button>
                        </div>


                    </div>
                ))}

            </div>
        </div>
    )
}

export default InterviewPage