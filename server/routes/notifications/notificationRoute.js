import express from 'express'
import { createNotification, deleteNotification, getAllNotifications, getUserNotificationsByUserId } from '../../controllers/notifications/notificationController.js';
const router = express.Router();

router.post("/", createNotification)
    .get("/", getAllNotifications)
    .get("/user/:userId", getUserNotificationsByUserId)   
    .delete("/:id", deleteNotification)

export default router;