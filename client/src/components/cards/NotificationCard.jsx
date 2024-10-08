import React from 'react'
import deleteIcon from '../../assets/delete.svg'
import MyImage from '../MyImage'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { useDeleteNotificationMutation } from '../../Redux/Notification/NotificationApi'
dayjs.extend(relativeTime)


const NotificationCard = ({ notification }) => {

    const [deleteNotification] = useDeleteNotificationMutation();

    const handleDelete = () => {
        deleteNotification(notification._id)
    }

    return (
        <div className='w-full h-[100px] flex flex-col gap-2 justify-between bg-bgInput1 rounded-lg p-2' >

            <div className='w-full flex gap-2 justify-start items-center'>
                <div className='w-[30px]'><MyImage className={"w-[30px] h-[30px]"} src={`https://api.multiavatar.com/${notification.from.name}.svg`} /></div>
                <p className='line-clamp-2 text-[14px]'>{notification.message}</p>
            </div>

            <div className='w-full flex justify-between'>
                <p className='text-[12px]'>{dayjs(notification.createdAt).toNow(true)} ago</p>
                <MyImage className={"w-[15px] h-[15px]"} src={deleteIcon} onClick={handleDelete} />
            </div>

        </div>
    )
}

export default NotificationCard