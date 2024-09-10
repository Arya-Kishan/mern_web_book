import Reac from 'react'
import logo from "../../assets/logo.svg"


const FirstPage = ({ setClick }) => {

    return (
        <div>

            <div className='w-full min-h-[500px] h-screen text-white text-center relative first overflow-hidden'>

                {/* TITLE AND LOGO AND LOGIN BUTTON */}
                <div className='w-full h-[60px] flex items-center justify-between px-2 sm:px-5'>

                    {/* title and logo */}
                    <p className='flex gap-2 sm:gap-5 items-center text-white'>
                        <img className='w-[30px] h-[30px]' src={logo} alt="" srcSet="" />
                        <strong className='text-[20px] sm:text-[25px] font-Irish'>Web <span className='text-customGreen'>Book</span> </strong>
                    </p>

                    <button onClick={() => setClick(true)} className='w-[60px] sm:w-[100px] h-[30px] sm:h-[40px] text-[18px] rounded-lg border-2 border-none bg-customGreen text-white'>Login</button>

                </div>

                <div className='w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center gap-5 px-5'>

                    <div className='flex flex-col text-[30px] md:text-[50px] lg:text-[60px] font-bold font-Irish'>
                        <p>Turn Your Messy <span className='text-customGreen'>Thoughts</span> </p>
                        <p>into actionable <span className='text-customGreen'>notes</span> </p>
                    </div>

                    <p className='font-medium text-[14px] md:text-[20px]'>Register within seconds or check it out as <span className='text-customGreen'>Guest</span></p>

                    <div className='flex items-center gap-8 md:gap-20 text-[14px] md:text-xl font-medium'>
                        <button onClick={() => setClick(true)} className='w-[120px] h-[40px] sm:h-[50px] rounded-lg border-2 border-none bg-customGreen text-white'>Register</button>
                        <button onClick={() => setClick(true)} className='w-[120px] h-[40px] sm:h-[50px] rounded-lg border-2 border-white'>Guest</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default FirstPage