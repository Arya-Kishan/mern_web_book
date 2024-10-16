import React, { useState } from 'react'
import MyImage from '../../components/MyImage'
import { useNavigate } from "react-router-dom"
import hamIcon from '../../assets/ham.svg'
import cancelIcon from '../../assets/cancel.svg'
import SearchUser from '../../components/FeedComp/SearchUser'
import { useGetSingleUserQuery } from '../../Redux/User/UserApi'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import Loader from '../../components/Loader'

const MyChats = () => {
    const navigate = useNavigate();
    const loggedInUser = useSelector(selectLoggedInUser)
    const [show, setShow] = useState(false)

    const { data: user, isLoading } = useGetSingleUserQuery(loggedInUser._id);

    return (
        <div className='w-full h-full '>

            <div className='w-full flex justify-between items-center'>
                <p className='text-[30px]'>Chat</p>
                <p className='text-[20px]'>{loggedInUser.name}</p>
                <MyImage onClick={() => setShow(!show)} src={hamIcon} className='w-[30px] h-[30px]' alt="icon" />
            </div>

            <div className='flex flex-col gap-2'>
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        user?.mychats?.map((e, i) => (
                            <div key={i} onClick={() => navigate(`/home/chat/${e._id}?name=${e.name}`)} className='w-full h-[60px] flex justify-between items-center gap-2 bg-blue-800 rounded-xl p-2 cursor-pointer hover:bg-blue-900'>
                                <div className='flex items-center gap-2'>
                                    <MyImage className={"w-[40px] h-[40px]"} src={`https://api.multiavatar.com/${e.name}.svg`} />
                                    <p className='text-[20px]'>{e.name}</p>
                                </div>
                                <p className='text-[12px] h-full flex items-center'>5 days ago</p>
                            </div>
                        ))
                }
            </div>

            <SearchUser show={show} setShow={setShow} />



        </div>
    )
}

export default MyChats