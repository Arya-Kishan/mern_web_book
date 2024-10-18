import React, { useState } from 'react'
import MyImage from '../../components/MyImage'
import { useNavigate } from "react-router-dom"
import hamIcon from '../../assets/add.svg'
import deleteIcon from '../../assets/delete.svg'
import SearchUser from '../../components/FeedComp/SearchUser'
import { useEditUserMutation, useGetSingleUserQuery } from '../../Redux/User/UserApi'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import Loader from '../../components/Loader'
import { getTimeAgo } from '../../helper/customFunction'
import { selectIsSocketConnected } from '../../Redux/Chat/chatSlice'

const MyChats = () => {
    const navigate = useNavigate();
    const loggedInUser = useSelector(selectLoggedInUser)
    const [show, setShow] = useState(false)
    const isSocketConnected = useSelector(selectIsSocketConnected)

    const { data: user, isLoading } = useGetSingleUserQuery(loggedInUser._id);
    const [editUser] = useEditUserMutation();


    // DELETE MYCHATS USERS FROM MY CHAT LIST
    const handleDelete = (opponentUserId) => {
        console.log(opponentUserId);
        editUser({ id: loggedInUser._id, delete_chat: opponentUserId })
    }

    if (isSocketConnected == "errorInConnecting") {
        return <Error />
    }

    return (
        isSocketConnected == "connecting"
            ?
            <Loader />
            :
            <div className='w-full h-full flex flex-col'>

                <div className='w-full flex justify-between items-center'>
                    <p className='text-[30px]'>Chat</p>
                    <MyImage onClick={() => setShow(!show)} src={hamIcon} className='w-[30px] h-[30px]' alt="icon" />
                </div>

                <div className='w-full h-full flex flex-col gap-2'>
                    {
                        !user
                            ?
                            <Loader />
                            :
                            user.mychats.length < 1
                                ?
                                <div className='w-full h-full flex justify-center items-center'>NO CHATS</div>
                                :
                                user?.mychats?.map((e, i) => (
                                    <div key={i} onClick={() => navigate(`/home/chat/${e._id}?name=${e.name}`)} className='w-full h-[60px] flex justify-between items-center gap-2 bg-blue-800 rounded-xl p-2 cursor-pointer hover:bg-blue-900'>
                                        <div className='flex items-center gap-2'>
                                            <MyImage className={"w-[40px] h-[40px]"} src={`https://api.multiavatar.com/${e.name}.svg`} />
                                            <div>
                                                <p className='text-[20px]'>{e.name}</p>
                                                <p className='text-[12px] h-full flex items-center'>{getTimeAgo(Number(e.online))}</p>
                                            </div>
                                        </div>

                                        <div onClick={e => e.stopPropagation()}>
                                            <MyImage src={deleteIcon} className={"w-[20px] h-[20px]"} onClick={() => handleDelete(e._id)} />
                                        </div>

                                    </div>
                                ))
                    }
                </div>

                <SearchUser show={show} setShow={setShow} />

            </div>
    )
}

export default MyChats