import express from 'express'
import { deleteGlobalInterview, getAllGlobalInterviews, getSingleInterview, globalUpdateInterview, makeGlobalInterview } from '../controllers/globalInterviewController.js';
const router = express.Router();

router.post("/", makeGlobalInterview)
    .get("/", getAllGlobalInterviews)
    .get("/single/:id", getSingleInterview)
    .put("/:id", globalUpdateInterview)
    .delete("/:id", deleteGlobalInterview)

export default router;