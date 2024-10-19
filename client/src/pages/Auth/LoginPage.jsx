import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { guestUserAsync, loginUserAsync, selectLoggedInUser, selectLoginLoader, setGoogleUserDetails } from '../../Redux/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoaderButton from '../../components/Button/LoaderButton';
import { toast } from 'react-toastify';
import logoIcon from '../../assets/logo.svg'
import personalIcon from '../../assets/personal.svg'
import openIcon from '../../assets/icons/open.svg'
import closeIcon from '../../assets/icons/close.svg'
import lockIcon from '../../assets/icons/lock.svg'
import googleIcon from '../../assets/icons/google.svg'
import { Navigate, useNavigate } from 'react-router-dom';
import MyImage from '../../components/MyImage';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../services/Firebase';
import Loader from '../../components/Loader';
import { handleError } from '../../helper/CreateError';



const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [password, setPassword] = useState(false)
    const [googleLoader, setGoogleLoader] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    const loginLoader = useSelector(selectLoginLoader)
    const navigate = useNavigate();

    if (user != null) {
        return <Navigate to={"/home/feed"} />
    }

    const onSubmit = (data) => {
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        let validEmail = gmailRegex.test(data.email)
        if (!validEmail) {
            return toast("NOT VALID GMAIL")
        }
        dispatch(loginUserAsync({ ...data, loginThrough: "custom" }));
    }

    const handleGuest = () => {
        dispatch(guestUserAsync());
    }

    const handleGoogleLogin = async () => {

        try {
            let newGoogleProvider = new GoogleAuthProvider();
            setGoogleLoader(true);
            let result = await signInWithPopup(auth, newGoogleProvider);
            if (result.user) {
                let { displayName, email, photoURL } = result.user;
                dispatch(loginUserAsync({ email: email, password: null, loginThrough: 'google' }));
                // SET THE USER DETAILS TO AUTH SLICE STATE WHICH GET FROM FIREBASE AND IT;S USED FOR ONLU SIGN OUT PURPOSE
                dispatch(setGoogleUserDetails({ displayName, email, photoURL }))
                setGoogleLoader(false);
            } else {
                setGoogleLoader(false);
                handleError("error", "error in login thorugh firebase google, google does not return the user details", "login page");
            }

        } catch (error) {
            setGoogleLoader(false);
            toast("try again");
            handleError(`${error.name}:${error.message}`, `error in login thorugh firebase google : ${error.stack.split("at").slice(0, 2).join("at")}`, "login page");
        }

    }

    return (
        googleLoader
            ?
            <Loader />
            :
            <div className='w-full h-dvh flex gap-5 justify-center items-center relative'>

                <div className='w-[100%] md:w-[80%] h-[480px] md:h-[520px] shadow1 flex gap-2'>
                    {/* left */}
                    <div className='w-full md:w-[50%] h-full flex flex-col gap-10 justify-center items-center bg-bgBackground'>

                        <div className='w-full flex justify-center items-center'>
                            <MyImage src={logoIcon} className={"w-[90px] h-[90px]"} />
                        </div>

                        <form className='w-[80%] flex flex-col gap-6 text-center' onSubmit={handleSubmit(onSubmit)}>

                            <div className='w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2'>
                                <MyImage src={personalIcon} alt="icon" className={"w-[30px] h-[30px]"} />
                                <input className='w-full p-2 rounded-lg' {...register('email', { required: true })} placeholder='Gmail...' />
                            </div>
                            {errors.email && <p className='text-red-600'>Email is required.</p>}

                            <div className='w-full bg-white rounded-lg px-2 flex items-center justify-between gap-2'>
                                <div className='w-full flex items-center'>
                                    <MyImage src={lockIcon} alt="icon" className={"w-[30px] h-[30px]"} />
                                    <input className='w-full p-2 rounded-lg' type={password ? "text" : "password"} {...register('password', { required: true })} placeholder='Password...' />
                                </div>
                                <div onClick={() => setPassword(!password)} className='flex'>
                                    {password
                                        ?
                                        <MyImage src={openIcon} alt="icon" className={"w-[20px] h-[20px]"} />
                                        :
                                        <MyImage src={closeIcon} alt="icon" className={"w-[20px] h-[20px]"} />
                                    }
                                </div>
                            </div>
                            {errors.password && <p className='text-red-600'>Password is required.</p>}

                            <div className='text-bgBackground font-semibold relative'>
                                <LoaderButton width={'100%'} text={"LOGIN"} bgColor='bg-[#75F94C]' loading={loginLoader} loaderColor={"#0A0A46"} />
                                <p onClick={handleGuest} className='absolute top-full right-2 text-[12px] text-white pt-[2px]'>Login as Guest</p>
                            </div>

                        </form>

                        <div className='w-[80%] flex justify-between items-center text-white'>
                            <p className='w-[40%] h-[2px] bg-white'></p>
                            <p>OR</p>
                            <p className='w-[40%] h-[2px] bg-white'></p>
                        </div>

                        <div onClick={handleGoogleLogin} className='w-[80%] p-2 flex justify-center gap-2 items-center text-center mt-2 rounded-lg border-2 border-white bg-bgBackground text-white' >
                            <MyImage src={googleIcon} className={"w-[20px] h-[20px]"} />
                            <span>Google</span>
                        </div>

                    </div>

                    {/* right */}
                    <div className='hidden md:flex w-[50%] h-full flex-col gap-5 justify-center items-center bg-[#1d1d71] text-white text-center'>
                        <p className='text-2xl font-bold'>Welcome to WebBook</p>
                        <p>Don't have an Account</p>
                        <p onClick={() => navigate("/signup")} className='w-[100px] rounded-lg bg-bgBackground px-4 py-2'>Sign Up</p>
                    </div>

                </div>

                <div className='block md:hidden w-full fixed bottom-2 left-0 text-center text-white text-[14px]'>
                    <p onClick={() => navigate("/signup")} >Don't have account, <span className='text-customGreen'>Sign Up</span></p>
                </div>

            </div>
    )
}

export default LoginPage