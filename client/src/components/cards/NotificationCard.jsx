import React from 'react'
import deleteIcon from '../../assets/delete.svg'
import MyImage from '../MyImage'
import { useDeleteNotificationMutation } from '../../Redux/Notification/NotificationApi'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import UserHeading from '../UserHeading'
import { getTimeAgo } from '../../helper/customFunction'


const NotificationCard = ({ notification, type = "global" }) => {

    const [deleteNotification] = useDeleteNotificationMutation();
    const loggedInUser = useSelector(selectLoggedInUser)

    const handleDelete = () => {
        deleteNotification(notification._id)
    }

    const transformMessage = (message) => {
        if (type == "global") {
            return message.replace("your", notification.to.name)
        }
        return message;

    }

    return (
        <div className='w-full h-[100px] flex flex-col gap-2 justify-between bg-bgInput1 rounded-lg p-2' >

            <div className='w-full flex gap-2 justify-start items-center'>
                <div className='w-[30px]'>
                    <UserHeading name={notification.from.name} userId={notification.from._id} showImage="show" showName="hide" />
                </div>
                <p className='line-clamp-2 text-[14px]'>{transformMessage(notification.message)}</p>
            </div>

            <div className='w-full flex justify-between'>
                <p className='text-[12px]'>{getTimeAgo(notification.createdAt)}</p>
                {notification.to._id == loggedInUser._id && <MyImage className={"w-[15px] h-[15px]"} src={deleteIcon} onClick={handleDelete} />}
            </div>

        </div>
    )
}

export default NotificationCard