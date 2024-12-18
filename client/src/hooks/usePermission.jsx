import React from 'react'
import { FCMTokenGeneration } from '../services/Firebase';
import { useEditUserMutation } from '../Redux/User/UserApi';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../Redux/Auth/AuthSlice';

const usePermission = () => {

    const [editUser] = useEditUserMutation();
    const loggedInUser = useSelector(selectLoggedInUser);

    const UpdateNotification = (data, type) => {
        let updatedUser = {
            id: loggedInUser._id,
            FCMtoken: {
                deviceToken: data == null ? null : data.deviceToken,
                pushPermission: type
            }
        }
        editUser(updatedUser);
    }

    const checkNotificationPermission = async (loggedInUser) => {

        if ("Notification" in window != true) {
            console.log("Browser des not support push notification");
            if (loggedInUser?.FCMtoken?.pushPermission !== "notSupported") {
                UpdateNotification(null, "notSupported");
            }
            return null;
        }

        const browserPermission = await Notification.requestPermission();
        // console.log(browserPermission);

        if (browserPermission == "denied") {
            if (loggedInUser?.FCMtoken?.pushPermission !== "denied") {
                console.log("updating notification as denied");
                UpdateNotification(null, "denied");
            }
            return null;
        }

        if (browserPermission == "granted") {
            if (loggedInUser?.FCMtoken?.pushPermission !== "accepted") {
                let allowance = await FCMTokenGeneration();
                if (allowance.permission == "accepted") {
                    console.log("updating notification as accepted");
                    UpdateNotification(allowance, "accepted");
                }
            }
        }

        return null;
    }

    return { checkNotificationPermission }
}

export default usePermission