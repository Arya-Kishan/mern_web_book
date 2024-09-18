import React, { lazy, useState } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import TextSlide from './TextSlide'
import Faq from './Faq'
import End from './End'
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