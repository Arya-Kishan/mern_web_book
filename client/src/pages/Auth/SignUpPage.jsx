import React, { lazy, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"
import { guestUserAsync, registerUserAsync, selectLoggedInUser, selectLoginLoader } from '../../Redux/Auth/AuthSlice';
import LoaderButton from '../../components/Button/LoaderButton';
import { toast } from 'react-toastify';
const HomePage = lazy(() => import("../HomePage"))


const SignUpPage = ({ handleToggleAuthPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  const loginLoader = useSelector(selectLoginLoader)

  if (user != null) {
    return <Suspense fallback=""><HomePage /></Suspense>
  }

  const onSubmit = (data) => {
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    let validEmail = gmailRegex.test(data?.email)
    if (!validEmail) {
      return toast("NOT VALID GMAIL")
    }

    if (data?.password.length < 5) {
      return toast("PASSWORD LENGTH MUST BE GRATER THAN 5")
    }
    dispatch(registerUserAsync(data));
  }


  const handleGuest = () => {
    dispatch(guestUserAsync());
  }

  return (
    <div className='w-full h-screen flex gap-5 justify-center items-center relative'>

      <div className='w-[80%] h-[480px] shadow1 flex gap-2'>
        {/* left */}
        <div className='w-full md:w-[50%] h-full flex flex-col gap-2 justify-center items-center bg-bgBackground'>


          <form className='w-[80%] flex flex-col gap-8 text-center' onSubmit={handleSubmit(onSubmit)}>

            <p className='text-2xl sm:text-5xl text-white'>Sign Up</p>

            <input className='p-2' {...register('name')} placeholder='Name...' />
            {errors.name && <p>Name is required.</p>}

            <input className='p-2' {...register('email')} placeholder='Email...' />
            {errors.email && <p>Email is required.</p>}

            <input className='p-2' {...register('password', { required: true })} placeholder='Password...' />
            {errors.password && <p>Password is required.</p>}

            <div className='text-white'><LoaderButton width={'100%'} text={"SIGN UP"} loading={loginLoader} /></div>

          </form>

          <p onClick={() => handleToggleAuthPage("login")} className='block md:hidden w-[80%] p-2 text-center mt-2 rounded-lg text-white border-2 border-white' >Login</p>

        </div>

        {/* right */}
        <div className='hidden md:flex w-[50%] h-full flex-col gap-5 justify-center items-center bg-[#1d1d71] text-white text-center'>
          <p className='text-2xl font-bold'>Welcome to WebBook</p>
          <p>Already have an Account</p>
          <p onClick={() => handleToggleAuthPage("login")} className='w-[100px] rounded-lg bg-bgBackground px-4 py-2'>Login</p>
        </div>
      </div>

      <button onClick={handleGuest} className='absolute bottom-2 right-4 text-white text-[12x] rounded-lg px-4 py-2 bg-blue-600'>Guest Login</button>

    </div>

  )
}

export default SignUpPage