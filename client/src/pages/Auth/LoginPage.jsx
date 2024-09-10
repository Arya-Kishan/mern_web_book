import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { guestUserAsync, loginUserAsync, selectLoggedInUser, selectLoginLoader } from '../../Redux/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoaderButton from '../../components/Button/LoaderButton';
import { toast } from 'react-toastify';
const HomePage = lazy(() => import("../HomePage"))
import logo from '../../assets/logo.svg'



const LoginPage = ({ handleToggleAuthPage }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    const loginLoader = useSelector(selectLoginLoader)
    console.log(loginLoader);

    if (user != null) {
        return <Suspense fallback=""><HomePage /></Suspense>
    }

    const onSubmit = (data) => {
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        let validEmail = gmailRegex.test(data.email)
        if (!validEmail) {
            return toast("NOT VALID GMAIL")
        }
        dispatch(loginUserAsync(data));
    }

    const handleGuest = () => {
        dispatch(guestUserAsync());
    }

    return (
        <div className='w-full h-dvh flex gap-5 justify-center items-center relative'>

            <div className='w-[100%] md:w-[80%] h-[480px] shadow1 flex gap-2'>
                {/* left */}
                <div className='w-full md:w-[50%] h-full flex flex-col gap-2 justify-center items-center bg-bgBackground'>

                    <form className='w-[80%] flex flex-col gap-10 text-center' onSubmit={handleSubmit(onSubmit)}>

                        <div className='w-full flex justify-center items-center'><img className='w-[90px] h-[90px]' src={logo} alt="logo" srcSet="" /></div>

                        <input className='p-2 rounded-lg' {...register('email', { required: true })} placeholder='Gmail...' />
                        {errors.email && <p className='text-red-600'>Email is required.</p>}

                        <input className='p-2 rounded-lg' {...register('password', { required: true })} placeholder='Password...' />
                        {errors.password && <p className='text-red-600'>Password is required.</p>}

                        <div className='text-bgBackground font-semibold'><LoaderButton width={'100%'} text={"LOGIN"} bgColor='bg-[#75F94C]' loading={loginLoader} /></div>
                    </form>

                    <p onClick={() => handleToggleAuthPage("signUp")} className='block md:hidden w-[80%] p-2 text-center mt-2 rounded-lg text-white border-2 border-white' >Sign Up</p>

                </div>

                {/* right */}
                <div className='hidden md:flex w-[50%] h-full flex-col gap-5 justify-center items-center bg-[#1d1d71] text-white text-center'>
                    <p className='text-2xl font-bold'>Welcome to WebBook</p>
                    <p>Don't have an Account</p>
                    <p onClick={() => handleToggleAuthPage("signUp")} className='w-[100px] rounded-lg bg-bgBackground px-4 py-2'>Sign Up</p>
                </div>
            </div>

            <div className='w-[80%] absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-[12x] flex justify-center md:justify-end items-center'>
                <button onClick={handleGuest} className='w-[150px] rounded-lg px-4 py-2 bg-customGreen'>Guest</button>
            </div>

        </div>
    )
}

export default LoginPage