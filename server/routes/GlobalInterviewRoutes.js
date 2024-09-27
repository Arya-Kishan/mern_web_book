import express from 'express'
import { deleteGlobalInterview, getAllGlobalInterviews, globalUpdateInterview, makeGlobalInterview } from '../controllers/globalInterviewController.js';
const router = express.Router();

router.post("/", makeGlobalInterview)
    .get("/", getAllGlobalInterviews)
    .put("/:id", globalUpdateInterview)
    .delete("/:id", deleteGlobalInterview)

export default router;