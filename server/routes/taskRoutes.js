import express from 'express'
import { createTask, deleteTask, getAllTaskByUserId, getSingleTask, updateTask } from '../controllers/taskController.js';
const router = express.Router();

router.post("/", createTask)
    .get("/all/:userId", getAllTaskByUserId)
    .get("/:id", getSingleTask)
    .put("/:id", updateTask)
    .delete("/:id", deleteTask)

export default router;