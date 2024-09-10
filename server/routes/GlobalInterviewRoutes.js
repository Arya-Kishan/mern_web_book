import express from 'express'
import { deleteGlobalInterview, getAllGlobalInterviews, makeGlobalInterview } from '../controllers/globalInterviewController.js';
const router = express.Router();

router.post("/", makeGlobalInterview)
    .get("/", getAllGlobalInterviews)
    .delete("/:id", deleteGlobalInterview)

export default router;