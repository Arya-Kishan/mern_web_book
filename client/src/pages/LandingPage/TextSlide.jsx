import React, { useLayoutEffect, useRef } from 'react'
import gsap from "gsap"
import circle from '../../assets/circle.svg'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TextSlide = ({setClick}) => {

    gsap.registerPlugin(ScrollTrigger)
    const parent = useRef()

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const topic = ["task", "note", "mcq", "interview", "doubt"]

    useLayoutEffect(() => {

        const ctx1 = gsap.context(() => {

            let t1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".fifth",
                    // markers: true,
                    start: "10% 90%",
                    end: "100% 10%",
                    scrub: 1,
                }
            })
                .to(".task", {
                    x: "-100%",
                }, 'a')
                .to(".note", {
                    x: "100%",
                }, 'a')
                .to(".mcq", {
                    x: "-100%",
                }, 'a')
                .to(".interview", {
                    x: "100%",
                }, 'a')
                .to(".doubt", {
                    x: "-100%",
                }, 'a')

        }, parent)

        return () => ctx1.revert();

    }, [])


    return (
        <div className='w-full min-h-dvh text-white overflow-hidden pb-[120px] bg-gradient-to-b from-[#0A0A46] to-transparent' ref={parent}>

            <div className='w-full min-h-dvh fifth'>

                {topic.map((word) => (
                    <div className='flex flex-col' key={word}>
                        <div className={`w-full h-[250px] flex items-center ${word == "note" || word == "interview" ? "justify-end" : "justify-start"} gap-[1px] ${word}`}>

                            {arr.map((e) => (<div key={e} className={`${word == "interview" ? "w-[400px]" : "w-[300px]"} flex items-center justify-center gap-[50px] flex-shrink-0`}>
                                <p className='text-[70px] font-semibold font-Aladin'>{word}</p>
                                <img className='w-[30px]' id='circle' src={circle} alt="" srcSet="" />
                            </div>))}

                        </div>

                        <div onClick={()=>setClick(true)} className='w-full flex justify-center items-center gap-5'>
                            <p className='w-[30%] md:w-[40%] h-[2px] bg-gray-800'></p>
                            <p className='text-gray-500 flex gap-2'>Click <span className='hidden md:block'>to View</span></p>
                            <p className='w-[30%] md:w-[40%] h-[2px] bg-gray-800'></p>
                        </div></div>
                ))}

            </div>

        </div>
    )
}

export default TextSlide