import express from 'express'
import { createTaskNotification, deleteTaskNotification, getAllTaskNotification } from '../../controllers/notifications/taskNotificationController.js';
const router = express.Router();

router.post("/", createTaskNotification)
    .get("/", getAllTaskNotification)
    .delete("/:id", deleteTaskNotification)

export default router;