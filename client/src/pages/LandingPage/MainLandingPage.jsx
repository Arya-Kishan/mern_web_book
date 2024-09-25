import React, { lazy, useState } from 'react'
const FirstPage = lazy(() => import("./FirstPage"))
const SecondPage = lazy(() => import("./SecondPage"))
const TextSlide = lazy(() => import("./TextSlide"))
const Faq = lazy(() => import("./Faq"))
const End = lazy(() => import("./End"))
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { Navigate } from 'react-router-dom'

const MainLandingPage = () => {

    const loggedInUser = useSelector(selectLoggedInUser)

    if (loggedInUser != null) {
        return <Navigate to={"/home/tasks"} />
    }

    return (
        <div className='w-full min-h-screen h-[100vh]'>
            <FirstPage />
            <SecondPage />
            <TextSlide />
            <Faq />
            <End />
        </div>
    )
}

export default MainLandingPage