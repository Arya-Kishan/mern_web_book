import express from 'express'
import { checkTaskNotification, createTaskNotification, deleteTaskNotification, getAllTaskNotification } from '../../controllers/notifications/taskNotificationController.js';
const router = express.Router();

router.post("/", createTaskNotification)
    .get("/", getAllTaskNotification)
    .get("/cron", checkTaskNotification)
    .delete("/:id", deleteTaskNotification)

export default router;