import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TaskPage from '../../components/LandingPage/TaskPage'
import NotesPage from '../../components/LandingPage/NotesPage'
import McqPage from '../../components/LandingPage/McqPage'
import InterviewPage from '../../components/LandingPage/InterviewPage'


const SecondPage = () => {

    gsap.registerPlugin(ScrollTrigger)
    const parent = useRef()

    const [online, setOnline] = useState(true);

    const boxes = [
        {
            classes1: "top-0 left-0 topLeft",
            classes2: "-bottom-[23px] -right-[90px] min-[350px]:-bottom-[46px] min-[350px]:-right-[146px]"
        },
        {
            classes1: "top-0 left-[50%] topRight",
            classes2: "-bottom-[23px] -left-[79px] min-[350px]:-bottom-[46px] min-[350px]:-left-[165px]"
        },
        {
            classes1: "bottom-0 left-0 bottomLeft",
            classes2: "-top-[34px] -right-[90px] min-[350px]:-top-[59px] min-[350px]:-right-[146px]"
        },
        {
            classes1: "bottom-0 left-[50%] bottomRight",
            classes2: "-top-[34px] -left-[79px] min-[350px]:-top-[59px] min-[350px]:-left-[165px]"
        }
    ]

    const pages = [
        {
            classes: "task left-0",
            element: <TaskPage />
        },
        {
            classes: "note left-[100%]",
            element: <NotesPage />
        },
        {
            classes: "mcq -right-[100%]",
            element: <McqPage />
        },
        {
            classes: "interview left-[100%]",
            element: <InterviewPage />
        }
    ]

    useLayoutEffect(() => {

        const ctx1 = gsap.context(() => {

            if (online) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".service",
                        // markers: true,
                        start: "0% 0%",
                        end: "1500% 0%",
                        scrub: 2,
                        pin: true,
                    }
                })
                    .to(".round", {
                        opacity: 1,
                        duration: 1,
                    }, 'z1')
                    .to(".slowScroll", {
                        opacity: 1,
                    }, 'z1')
                    .to(".round", {
                        left: "100%",
                        duration: 1,
                    }, 'z2')
                    .to(".round", {
                        bottom: "100%",
                        duration: 1,
                    }, 'z3')
                    .to(".round", {
                        left: "-40px",
                        duration: 1,
                    }, 'z4')
                    .to(".round", {
                        bottom: "0%",
                        opacity: '0',
                        duration: 1,
                    }, 'z5')
                    .to(".slowScroll", {
                        opacity: 0,
                    }, 'z5')

                    .to(".topLeft", {
                        top: '-50%',
                        left: '-50%',
                        duration: 6,
                    }, 'a')
                    .to(".topRight", {
                        top: '-50%',
                        left: '100%',
                        duration: 6,
                    }, 'a')
                    .to(".bottomLeft", {
                        bottom: '-50%',
                        left: '-50%',
                        duration: 6,
                    }, 'a')
                    .to(".bottomRight", {
                        bottom: '-50%',
                        left: '100%',
                        duration: 6,
                    }, 'a')

                    .to(".task", {
                        left: '-100%',
                        duration: 3,
                    }, 'b')
                    .to(".note", {
                        left: '0%',
                        duration: 3,
                    }, 'b')
                    .to(".note", {
                        left: '-100%',
                        duration: 3,
                    }, 'c')
                    .to(".mcq", {
                        right: '0%',
                        duration: 3,
                    }, 'c')
                    .to(".mcq", {
                        right: '100%',
                        duration: 3,
                    }, 'd')
                    .to(".interview", {
                        left: '0%',
                        duration: 3,
                    }, 'd')

            }

        }, parent)

        return () => ctx1.revert();

    }, [online])

    window.addEventListener("online", () => { console.log("online"); setOnline(true) })
    window.addEventListener("offline", () => { console.log("offline"); setOnline(false) })

    return (
        <div ref={parent}>

            {online ? <>

                <div className='w-full min-h-[600px] h-screen bg-bgBackground relative service overflow-hidden text-white'>

                    {boxes.map((e) => (
                        <div className={`w-[50%] h-[50%] overflow-hidden bg-bgBackground z-40 absolute ${e.classes1} font-Irish`}>
                            <p className={`text-[38px] min-[350px]:text-[70px] absolute font-bold ${e.classes2}`}>SERVICES</p>
                        </div>
                    ))}

                    <div className='w-full h-full flex justify-center items-center text-white text-[100px] tracking-wide'>
                        {pages.map((e) => (<div className={` absolute top-0 ${e.classes} font-Aladin`}>{e.element}</div>))}
                    </div>

                </div>

                <p className='fixed bottom-[2%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[15px] tracking-wide slowScroll opacity-0'>Scroll Down Slowly</p>

                <div className='round w-[40px] h-[40px] rounded-full fixed -bottom-[40px] left-0 opacity-0'></div>

            </> : <div className='w-full min-h-[600px] h-screen bg-bgBackground text-[30px] sm:text-[70px] font-bold text-white flex justify-center items-center font-Irish'>SERVICES</div>}

        </div>
    )
}

export default SecondPage