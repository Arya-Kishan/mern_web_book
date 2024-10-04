import React from 'react'
import { permissionAndTokenGeneration } from '../services/Firebase';
import { useEditUserMutation } from '../Redux/User/UserApi';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../Redux/Auth/AuthSlice';

const usePermission = () => {

    const [editUser, { data }] = useEditUserMutation();
    const loggedInUser = useSelector(selectLoggedInUser);

    const NotificationGranted = (data) => {
        let updatedUser = {
            id: loggedInUser._id,
            FCMtoken: {
                deviceToken: data.deviceToken,
                pushPermission: "accepted"
            }
        }
        editUser(updatedUser);
    }

    const NotificationDenied = (data) => {
        let updatedUser = {
            id: loggedInUser._id,
            FCMtoken: {
                deviceToken: null,
                pushPermission: "rejected"
            }
        }
        editUser(updatedUser);
    }

    const checkNotificationPermission = async (loggedInUser) => {

        if (loggedInUser?.FCMtoken?.pushPermission == "consentNeeded") {

            let allowance = await permissionAndTokenGeneration();
            if (allowance.permission == "rejected") {
                console.log("PERMISSION REJECTED UPDATE IN DATABASE");
                NotificationDenied(allowance);
                return null;
            } else {
                console.log("PERMISSION ACCEPTED UPDATE IN DATABASE");
                NotificationGranted(allowance);
                return null;
            }
        }

        return null;
    }

    return { checkNotificationPermission }
}

export default usePermission