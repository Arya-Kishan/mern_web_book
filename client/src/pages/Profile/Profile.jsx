import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import settingIcon from '../../assets/setting.svg'
import chatIcon from '../../assets/chat.svg'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import Loader from '../../components/Loader'
import MyImage from '../../components/MyImage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditUserMutation, useGetSingleUserQuery } from '../../Redux/User/UserApi'
import { getTimeAgo } from '../../helper/customFunction'
import { MyContext } from '../../Context/SocketContext'
const UserPosts = lazy(() => import("./UserPosts"))
const ProfileChart = lazy(() => import("./ProfileChart"))

const Profile = () => {
    const loggedInUser = useSelector(selectLoggedInUser);
    const navigate = useNavigate();
    const params = useParams();
    const { onlineUsers } = useContext(MyContext);
    const [setting, setSetting] = useState(false);

    const { data: userDetail, isLoading: userLoading, error: erroruser, isError: userError, isSuccess: userSuccess } = useGetSingleUserQuery(params.userId);

    const [editUser] = useEditUserMutation();

    const navigateToChat = () => {

        if (!loggedInUser.mychats.includes(userDetail._id)) {
            editUser({ id: loggedInUser._id, new_chat: userDetail._id })
            navigate(`/home/chat/${userDetail._id}?name=${userDetail.name}`)
        } else {
            navigate(`/home/chat/${userDetail._id}?name=${userDetail.name}`)
        }

    }

    // adding event listener to window whenver click outside pop up get closed
    useEffect(() => {
        window.addEventListener("click", () => { setSetting(false) })

        return () => {
            window.removeEventListener("click", () => { setSetting(false) })
        }

    }, [])


    return (
        userLoading
            ?
            <Loader />
            :
            <>

                <div className='w-full h-fit flex justify-between relative'>

                    <div className='w-full flex gap-2 md:gap-10 items-center justify-start text-[20px] sm:text-[40px] mr-4 overflow-hidden'>

                        <div className='w-[50px] h-[50px] md:w-[100px] md:h-[100px]'>
                            <MyImage className={"w-full h-full"} src={`https://api.multiavatar.com/${userDetail.name}.svg`} />
                        </div>

                        <div className='h-full flex flex-col items-start'>
                            <span>{userDetail.name}</span>
                            <span className='text-[10px] md:text-[20px]'>{userDetail.email}</span>
                            <p className='text-[10px] text-customGreen'>
                                {onlineUsers.includes(userDetail._id)
                                    ?
                                    "online"
                                    :
                                    getTimeAgo(Number(userDetail.online))
                                }
                            </p>
                        </div>
                        
                    </div>

                    <div onClick={e => e.stopPropagation()} className='w-fit h-full flex flex-col justify-between items-center gap-5 relative'>
                        <MyImage className={`w-[20px] h-[20px] md:w-[30px] md:h-[30px] transition-all duration-700 ${setting ? "rotate-0" : "rotate-90"}`} src={settingIcon} onClick={() => setSetting(!setting)} alt="icon" />
                        {
                            loggedInUser._id !== userDetail._id
                            &&
                            <MyImage className='w-[20px] h-[20px]' src={chatIcon} onClick={navigateToChat} alt="icon" />
                        }

                        {
                            setting && <div className='w-[200px] h-[200px] absolute top-[14px] right-[14px] md:top-[24px] md:right-[24px] bg-bgNotePop text-white rounded-xl'>
                                <p className='p-2 border-b-2 border-blue-800'>Update</p>
                                <p className='p-2 border-b-2 border-blue-800'>Notification : {userDetail.FCMtoken.pushPermission}</p>
                                {userDetail.role == "admin" && <p className='p-2 border-b-2 border-blue-800' onClick={() => navigate("/admin")}>Admin</p>}
                            </div>
                        }

                    </div>

                </div>

                {/* chart */}
                <div className='w-full h-[200px] md:min-h-[350px] pt-5'>
                    <Suspense fallback="">
                        <ProfileChart userId={userDetail._id} />
                    </Suspense>
                </div>


                <Suspense fallback="">
                    <UserPosts userId={userDetail._id} />
                </Suspense>


            </>
    )
}

export default Profile