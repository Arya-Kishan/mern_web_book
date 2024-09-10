import express from 'express'
import { createInterview, deleteInterview, getAllInterviewsByUserId, getSingleInterview, updateInterview } from '../controllers/interviewController.js';
const router = express.Router();

router.post("/", createInterview)
    .get("/all/:userId", getAllInterviewsByUserId)
    .get("/:id", getSingleInterview)
    .put("/:id", updateInterview)
    .delete("/:id", deleteInterview)

export default router;