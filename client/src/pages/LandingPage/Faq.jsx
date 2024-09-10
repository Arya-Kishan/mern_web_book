import React, { useLayoutEffect, useRef } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Faq = () => {

    gsap.registerPlugin(ScrollTrigger)
    const parent = useRef()

    const faq = [
        {
            question: 'What is WebBook',
            answer: 'WebBook is a web App. It can be used for creating task, save your personal notes and shares interview output and theory questions'
        },
        {
            question: 'How can I view global Notes or Interview Question',
            answer: "In particular category page, there's a filter icon, check it out you will get a way to navigate to global category "
        },
        {
            question: 'Who shlould use WebBook',
            answer: 'Anyone can use WebBook for their personal use, either for creating task or saving notes, the user atleast knows how to play around the website'
        },
        {
            question: 'Do I need to know anything in prior',
            answer: 'No, There is nothing required to know in prior you must know how to use internet.'
        },
        {
            question: 'How can I convert my personal Mcq or Notes into global Notes or MCQ',
            answer: 'In particular category page card, there will be three dot, when you click on it, you will be popUp for making it global.'
        },
    ]

    useLayoutEffect(() => {

        const ctx1 = gsap.context(() => {

            gsap.from(".heading", {
                scrollTrigger: ".heading",
                y: "100px",
                opacity: 0,
                stagger: 0.2,
            })

        }, parent)

        return () => ctx1.revert();

    }, [])

    return (
        <div className='w-full min-h-dvh flex flex-col justify-start items-center text-white bg-gradient-to-b to-[#0A0A46] from-transparent' ref={parent}>

            <div className='w-[85%] sm:w-[60%] flex flex-col my-[60px]'>

                <p className='w-full text-[40px] font-semibold font-Aladin heading'>Frequently Asked Questions</p>
                <p className='w-full h-[5px] bg-gray-400 mt-[30px] heading'></p>

                {faq.map((faq, i) => (
                    <div key={i} className='w-full flex flex-col gap-2 mt-[30px] heading'>
                        <p className='text-[18px] font-semibold'>{faq.question}</p>
                        <p className='font-Itim'>{faq.answer.slice(0, 80)} <span className='hidden sm:block'>{faq.answer.slice(80)}</span> </p>
                        <p className='w-full h-[5px] bg-gray-800 mt-[20px]'></p>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Faq