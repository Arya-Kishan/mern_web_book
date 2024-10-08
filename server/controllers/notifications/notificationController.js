import { Notification } from '../../models/notifications/notificationModel.js'
import AsyncHandler from '../../utilis/AsyncHandler.js';

export const createNotification = AsyncHandler(async (req, res) => {
    const doc = new Notification(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating notification")

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
    const doc = await Notification.find({ to: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user all notification")

export const deleteNotification = AsyncHandler(async (req, res) => {
    const doc = await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting notification")
