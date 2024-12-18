import React from 'react'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import doubtIcon from '../../assets/icons/doubtIcon.svg'
import mcqIcon from '../../assets/icons/mcqIcon.svg'
import bellIcon from '../../assets/icons/bell.svg'
import feedIcon from '../../assets/feed.svg'
import gameIcon from '../../assets/game.svg'
import messageIcon from '../../assets/message.svg'
import noteIcon from '../../assets/icons/noteIcon.svg'
import qnaIcon from '../../assets/icons/qnaIcon.svg'
import taskIcon from '../../assets/icons/taskIcon.svg'
import MyImage from '../../components/MyImage';
import Logout from '../Auth/Logout';
import { toast } from 'react-toastify';


const LeftHome = ({ slide, setSlide }) => {
    const loggedInUser = useSelector(selectLoggedInUser)
    const navigate = useNavigate();
    const location = useLocation();

    const navList = [{ name: "feed", pic: feedIcon }, { name: 'tasks', pic: taskIcon }, { name: 'notes', pic: noteIcon }, { name: 'interview', pic: qnaIcon }, { name: 'mcq', pic: mcqIcon }, { name: 'doubt', pic: doubtIcon }, { name: "bell", pic: bellIcon }, { name: "mychats", pic: messageIcon }, { name: 'games', pic: gameIcon }]

    const notAllowedRoutes = ["mychats", "doubt", "games"]

    const handleNavigate = (route) => {
        setSlide(!slide);
        if (notAllowedRoutes.includes(route) && loggedInUser.name == "Guest") {
            toast.info("Please Login")
        } else {
            navigate(`/home/${route}`)
        }
    }

    return (
        <>
            {/* LEFT SIDE */}
            <div className={`shadow fixed top-0 ${slide ? "-left-full" : "-left-0"} w-[180px] bg-bgBackground md:static md:w-[20%] h-full flex flex-col justify-between items-center gap-2 py-4 rounded-none md:rounded-[20px] transition-all duration-300 z-50 md:z-0`}>

                {/* profile */}
                <div onClick={() => { navigate(`/home/profile/${loggedInUser._id}`); setSlide(!slide) }} className='w-full h-[30px] flex gap-2 items-center justify-center text-[25px] sm:text-[18px] mr-4 overflow-hidden cursor-pointer'>
                    <MyImage className='w-[30px] h-[30px]' src={`https://api.multiavatar.com/${loggedInUser.name}.svg`} alt="" />
                    <p className='w-[80px] text-ellipsis overflow-hidden'>{loggedInUser.name.split(" ").slice(0, 1)}</p>
                </div>

                {/* navlinks */}
                <div className='w-full h-full overflow-scroll flex flex-col justify-start items-center gap-5 capitalize text-center'>
                    {
                        navList.map((word, i) =>
                            <div onClick={() => handleNavigate(word.name)} key={i} className={`w-full flex gap-4 items-center justify-start pl-5 hover:bg-blue-800 p-2 cursor-pointer ${location.pathname.includes(word.name) ? "bg-blue-800" : "bg-transparent"}`}>
                                <MyImage className='w-[25px] h-[25px]' src={word.pic} alt="" />
                                <p className='tracking-wider text-[22px] sm:text-[18px]'>{word.name}</p>
                            </div>
                        )
                    }
                </div>

                <Logout />

            </div>

            {/* BLACK SHADOW CONES WITH LEFT BAR SLIDER */}
            <div onClick={() => setSlide(!slide)} className={`w-[calc(100vw-180px)] h-dvh block fixed top-0 ${slide ? "right-full" : "right-0"} transition-all duration-300 md:hidden bg-[#00000091] z-50`}></div>
        </>
    )
}

export default LeftHome