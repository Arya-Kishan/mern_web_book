import React, { useState } from 'react'
import { useGetAllNotificationsQuery, useGetUserNotificationsQuery } from '../Redux/Notification/NotificationApi'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../Redux/Auth/AuthSlice'
import Loader from './Loader'
import NotificationCard from './cards/NotificationCard'
import Toggle from './common/Toggle'

const Notification = () => {

  const [showGlobal, setShowGlobal] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser)
  const { data: allNotifications, isLoading: allNotificationsLoading } = useGetAllNotificationsQuery()
  const { data: allUserNotifications, isLoading: allUserNotificationsLoading } = useGetUserNotificationsQuery(loggedInUser._id)

  const handleToggle = (word) => {
    if (word == "global") {
      setShowGlobal(true)
    } else {
      setShowGlobal(false)
    }
  }

  console.log(showGlobal);


  return (
    <div className='w-full h-full'>

      {/* heading */}
      <div className='w-full h-[32px] flex justify-between'>
        <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Notification</p>
        <Toggle buttonsArr={["personal", "global"]} onChange={handleToggle} />
      </div>

      {allNotificationsLoading || allUserNotificationsLoading
        ?
        <Loader />
        :
        <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-2 pt-5'>
          {
            showGlobal
              ?
              allNotifications.map((e) => (
                <NotificationCard key={e._id} notification={e} />
              ))
              :
              allUserNotifications.map((e) => (
                <NotificationCard key={e._id} notification={e} />
              ))
          }
        </div>
      }

    </div>
  )
}

export default Notification