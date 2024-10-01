import React, { lazy, Suspense, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"
import { guestUserAsync, registerUserAsync, selectLoggedInUser, selectLoginLoader, setGoogleUserDetails } from '../../Redux/Auth/AuthSlice';
import LoaderButton from '../../components/Button/LoaderButton';
import { toast } from 'react-toastify';
const HomePage = lazy(() => import("../HomePage"))
import logoIcon from '../../assets/logo.svg'
import personalIcon from '../../assets/personal.svg'
import openIcon from '../../assets/icons/open.svg'
import closeIcon from '../../assets/icons/close.svg'
import lockIcon from '../../assets/icons/lock.svg'
import googleIcon from '../../assets/icons/google.svg'
import emailIcon from '../../assets/icons/email.svg'
import { Navigate, useNavigate } from 'react-router-dom';
import MyImage from '../../components/MyImage';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../services/Firebase';

const SignUpPage = ({ handleToggleAuthPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  const navigate = useNavigate();
  const loginLoader = useSelector(selectLoginLoader)

  if (user != null) {
    return <Navigate to={"/home/tasks"} />
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

  const handleGoogleSignUp = async () => {

    try {
      let newGoogleProvider = new GoogleAuthProvider();
      let result = await signInWithPopup(auth, newGoogleProvider);
      if (result.user) {
        let { displayName, email, photoURL } = result.user;
        let newUser = {
          name: displayName,
          email: email,
          password: import.meta.env.VITE_GOOGLE_GOOGLE_SIGNIN_KEY,
          role: 'user'
        }
        dispatch(registerUserAsync(newUser));
        // SET THE USER DETAILS TO AUTH SLICE STATE WHICH GET FROM FIREBASE AND IT;S USED FOR ONLU SIGN OUT PURPOSE
        dispatch(setGoogleUserDetails({ displayName, email, photoURL }))
      } else {
        toast("try again")
        handleError("error", "error in sign up thorugh firebase google, google does not return the user details", "signup page");
      }

    } catch (error) {
      toast("try again")
      handleError(error, "error in sign up thorugh firebase google", "signUp page",);
    }

  }

  return (
    <div className='w-full h-screen flex gap-5 justify-center items-center relative'>

      <div className='w-full md:w-[80%] h-[480px] shadow1 flex gap-2'>
        {/* left */}
        <div className='w-full md:w-[50%] h-full flex flex-col gap-8 justify-center items-center bg-bgBackground'>

          <div className='w-full flex justify-center items-center'>
            <MyImage src={logoIcon} className={"w-[90px] h-[90px]"} alt={"logo"} />
          </div>

          <form className='w-[80%] flex flex-col gap-6 text-center' onSubmit={handleSubmit(onSubmit)}>

            <div className='w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2'>
              <MyImage src={personalIcon} alt="icon" className={"w-[30px] h-[30px]"} />
              <input className='w-full p-2 rounded-lg' {...register('name')} placeholder='Name...' />
            </div>
            {errors.name && <p>Name is required.</p>}

            <div className='w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2'>
              <MyImage src={emailIcon} alt="icon" className={"w-[30px] h-[30px]"} />
              <input className='w-full p-2 rounded-lg' {...register('email')} placeholder='Email...' />
            </div>
            {errors.email && <p>Email is required.</p>}

            <div className='w-full bg-white rounded-lg px-2 flex items-center justify-between gap-2'>
              <div className='w-full flex items-center'>
                <MyImage src={lockIcon} alt="icon" className={"w-[30px] h-[30px]"} />
                <input className='w-full p-2 rounded-lg' type={password ? "text" : "password"} {...register('password', { required: true })} placeholder='Password...' />
              </div>
              <p onClick={() => setPassword(!password)} className='flex'>
                {password
                  ?
                  <MyImage src={openIcon} alt="icon" className={"w-[30px] h-[30px]"} />
                  :
                  <MyImage src={closeIcon} alt="icon" className={"w-[30px] h-[30px]"} />
                }
              </p>
            </div>
            {errors.password && <p>Password is required.</p>}

            <div className='text-bgBackground font-semibold relative'>
              <LoaderButton width={'100%'} text={"SIGN UP"} loading={loginLoader} bgColor='bg-[#75F94C]' loaderColor={"#0A0A46"} />
              <p onClick={handleGuest} className='absolute top-full right-2 text-[12px] text-white pt-[2px]'>View as Guest</p>
            </div>

          </form>

          <div className='w-[80%] flex justify-between items-center text-white'>
            <p className='w-[40%] h-[2px] bg-white'></p>
            <p>OR</p>
            <p className='w-[40%] h-[2px] bg-white'></p>
          </div>

          <div onClick={handleGoogleSignUp} className='w-[80%] p-2 flex justify-center gap-2 items-center text-center mt-2 rounded-lg border-2 border-white bg-bgBackground text-white' >
            <MyImage src={googleIcon} className={"w-[20px] h-[20px]"} />
            <span>Google</span>
          </div>

        </div>

        {/* right */}
        <div className='hidden md:flex w-[50%] h-full flex-col gap-5 justify-center items-center bg-[#1d1d71] text-white text-center'>
          <p className='text-2xl font-bold'>Welcome to WebBook</p>
          <p>Already have an Account</p>
          <p onClick={handleGoogleSignUp} className=' w-[80%] p-2 text-center mt-2 rounded-lg text-white border-2 border-white' >Google SignUp</p>
          <p onClick={() => navigate("/login")} className='w-[100px] rounded-lg bg-bgBackground px-4 py-2'>Login</p>
        </div>
      </div>

      <div className='block md:hidden w-full fixed bottom-2 left-0 text-center text-white text-[14px]'>
        <p onClick={() => navigate("/login")} >Already have account, <span className='text-customGreen'>Login</span></p>
      </div>

    </div>

  )
}

export default SignUpPage