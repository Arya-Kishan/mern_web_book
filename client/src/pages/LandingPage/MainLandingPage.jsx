import React, { lazy, useState } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import TextSlide from './TextSlide'
import Faq from './Faq'
import End from './End'

const LoginPage = lazy(() => import("../../pages/Auth/LoginPage"))
const SignUpPage = lazy(() => import("../../pages/Auth/SignUpPage"))

const MainLandingPage = () => {

    const [show, setShow] = useState(false);
    const [click, setClick] = useState(false);

    const handleToggleAuthPage = (authComp) => {
        if (authComp == "login") {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    return (
        <div className='w-full min-h-screen h-[100vh]'>

            {!click && <>
                <FirstPage setClick={setClick} />
                <SecondPage />
                <TextSlide setClick={setClick} />
                <Faq />
                <End />
            </>}


            {click ?
                show
                    ?
                    <SignUpPage handleToggleAuthPage={handleToggleAuthPage} />
                    :
                    <LoginPage handleToggleAuthPage={handleToggleAuthPage} />
                :
                ""
            }

        </div>
    )
}

export default MainLandingPage