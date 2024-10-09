import { Notification } from '../../models/notifications/notificationModel.js'
import { User } from '../../models/userModel.js';
import sendNotificationFCM from '../../services/FirebaseFCM.js';
import AsyncHandler from '../../utilis/AsyncHandler.js';

export const createNotification = AsyncHandler(async (req, res) => {
    const doc = new Notification(req.body);
    const newDoc = await doc.save();
    // await sendPushNotification(newDoc);
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating notification or sending push notification")

export const getAllNotifications = AsyncHandler(async (req, res) => {
    const doc = await Notification.find().populate({
        path: 'from',
        select: "name",
    }).populate({
        path: 'to',
        select: "name",
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all notification")

export const getUserNotificationsByUserId = AsyncHandler(async (req, res) => {
    const doc = await Notification.find({ to: req.params.userId }).populate({
        path: 'from',
        select: "name",
    }).populate({
        path: 'to',
        select: "name",
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user all notification")

export const deleteNotification = AsyncHandler(async (req, res) => {
    const doc = await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting notification")


const sendPushNotification = async (notification) => {
    const user = await User.findById(notification.to);
    if (user.FCMtoken.pushPermission == "accepted") {
        const result = await sendNotificationFCM(user.FCMtoken.deviceToken, notification.category, notification.message)
        if (!result.success) {
            try {
                let updateUser = {
                    FCMtoken: {
                        deviceToken: '',
                        pushPermission: 'consentNeeded'
                    }
                }
                await User.findByIdAndUpdate(user._id, updateUser, { new: true });
            } catch (error) {
                console.log(error);
                console.log("ERROR IN UPDATING USER FOR DCM TOKEN");
            }
        }
    }
}