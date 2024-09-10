import React from 'react'
import editIcon from '../../assets/edit.svg'
import threeDotIcon from '../../assets/threeDot.svg'

const NotesPage = () => {
    const notes = [
        {
            title: "Save your notes",
            condition: "completed",
            description: "Read the React Notes. It will take 5mins",
        },
        {
            title: "Javascript",
            condition: "incompleted",
            description: "Javascript is a programming language",
        },
        {
            title: "CSS",
            condition: "completed",
            description: "CSS is used for designing webbsite",
        },
        {
            title: "Redux Toolkit",
            condition: "incompleted",
            description: "A State Management Library",
        },
    ]
    return (

        <div className='w-[100vw] h-screen flex justify-center items-center'>
            <div className='w-[80%] h-[80%] flex flex-wrap justify-center items-center gap-1 sm:gap-5 bg-blue-800 rounded-xl p-2  shadow-md shadow-white'>
                {
                    notes.map((note, i) => (
                        <div key={i} className='flex flex-col gap-3 justify-evenly items-start bg-bg-card  w-full sm:w-[45%] h-[20%] sm:h-[200px] p-4 rounded-lg text-[14px]'>

                            <div className='w-full flex justify-between relative'>
                                <p className='font-semibold text-[14px] sm:text-2xl line-clamp-1'>{note.title}</p>
                                <img className='w-[20px] sm:w-[30px]' src={threeDotIcon} alt="" srcSet="" />
                            </div>

                            <p className='line-clamp-2 text-[10px] sm:text-1xl hidden sm:block'>{note.description}</p>

                            <div className='w-full flex gap-2 items-center justify-between pt-1 sm:pt-[40px]'>

                                <p>01/01/25</p>

                                <img className='w-[20px] sm:w-[30px] bg-[#0A0A46] p-1 sm:p-[6px] rounded-full' src={editIcon} alt="" srcSet="" />

                            </div>

                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default NotesPage