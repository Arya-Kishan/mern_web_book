import React from 'react'
import { logoutUser, selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import doubtIcon from '../../assets/icons/doubtIcon.svg'
import mcqIcon from '../../assets/icons/mcqIcon.svg'
import noteIcon from '../../assets/icons/noteIcon.svg'
import qnaIcon from '../../assets/icons/qnaIcon.svg'
import taskIcon from '../../assets/icons/taskIcon.svg'
import logoutIcon from '../../assets/logout.svg'
import MyImage from '../../components/MyImage';


const LeftHome = ({ slide, setSlide }) => {
    const loggedInUser = useSelector(selectLoggedInUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navList = [{ name: 'tasks', pic: taskIcon }, { name: 'notes', pic: noteIcon }, { name: 'interview', pic: qnaIcon }, { name: 'mcq', pic: mcqIcon }, { name: 'doubt', pic: doubtIcon }]

    const handleLogout = () => {
        localStorage.setItem("slide", "notLogged");
        localStorage.setItem("x-webbook-jwt-routes", null);
        dispatch(logoutUser());
        navigate("/")
    }

    return (
        <>
            {/* LEFT SIDE */}
            <div className={`shadow fixed top-0 ${slide ? "-left-full" : "-left-0"} w-[180px] bg-bgBackground md:static md:w-[20%] h-full flex flex-col justify-between items-center gap-2 py-4 rounded-none md:rounded-[20px] transition-all z-50`}>

                {/* profile */}
                <div onClick={() => { navigate("/home/profile"); setSlide(!slide) }} className='w-full flex gap-2 items-center justify-center text-[25px] sm:text-[18px] mr-4 overflow-hidden cursor-pointer'>
                    <MyImage className='w-[30px] h-[30px]' src={`https://api.multiavatar.com/${loggedInUser.name}.svg`} alt="" />
                    <p>{loggedInUser.name}</p>
                </div>

                {/* navlinks */}
                <div className='w-full h-fit flex flex-col gap-5 capitalize text-center'>
                    {navList.map((word, i) => <Link onClick={() => setSlide(!slide)} key={i} to={`/home/${word.name}`} className='flex gap-4 items-center justify-start pl-5 hover:bg-blue-800 p-2'>
                        <MyImage className='w-[25px] h-[25px]' src={word.pic} alt="" />
                        <p className='tracking-wider text-[22px] sm:text-[18px]'>{word.name}</p>
                    </Link>)}
                </div>

                {/* THEME : TOGGLE DARK AND LIGHT*/}
                <div onClick={handleLogout} className='w-full flex gap-2 justify-center items-center cursor-pointer'>
                    <MyImage className={"w-[30px] h-[30px]"} src={logoutIcon} alt="" />
                    <p>Logout</p>
                </div>

            </div>
            <div onClick={() => setSlide(!slide)} className={`w-[calc(100vw-180px)] h-dvh block fixed top-0 ${slide ? "right-full" : "right-0"} transition-all md:hidden bg-[#00000091] z-50`}></div>
        </>
    )
}

export default LeftHome