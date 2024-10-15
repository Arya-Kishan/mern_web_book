import React, { useState } from 'react'
import { useGetAllNotificationsQuery, useGetUserNotificationsQuery } from '../../Redux/Notification/NotificationApi'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import Loader from '../../components/Loader'
import NotificationCard from '../../components/cards/NotificationCard'
import Toggle from '../../components/common/Toggle'

const Notification = () => {

  const [showGlobal, setShowGlobal] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser)
  const { data: allNotifications, isLoading: allNotificationsLoading } = useGetAllNotificationsQuery("", { skip: !showGlobal })
  const { data: allUserNotifications, isLoading: allUserNotificationsLoading } = useGetUserNotificationsQuery(loggedInUser._id)

  const handleToggle = (word) => {
    if (word == "global") {
      setShowGlobal(true)
    } else {
      setShowGlobal(false)
    }
  }

  return (
    <div className='w-full h-full'>

      {/* heading */}
      <div className='w-full h-[32px] flex justify-between'>
        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Notification</p>
        <div className='w-[120px] md:w-[200px] flex gap-2'><Toggle onChange={handleToggle} /></div>
      </div>

      {allNotificationsLoading || allUserNotificationsLoading
        ?
        <Loader />
        :
        showGlobal
          ?
          <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-col justify-start items-start gap-2 pt-5'>
            {
              allNotifications?.length > 0
                ?
                allNotifications.map((e) => (
                  <NotificationCard key={e._id} notification={e} type={"global"} />
                ))
                :
                <div className='w-full h-full flex justify-center items-center'>No Notification</div>
            }
          </div>
          :
          <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-2 pt-5'>
            {
              allUserNotifications?.length > 0
                ?
                allUserNotifications.map((e) => (
                  <NotificationCard key={e._id} notification={e} type={"personal"} />
                ))
                :
                <div className='w-full h-full flex justify-center items-center'>No Notification</div>
            }
          </div>
      }

    </div>
  )
}

export default Notification