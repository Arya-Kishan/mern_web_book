import express from 'express'
import { createQuestion, deleteQuestion, getInterviewQuestions, getQuestion, pushCollection, updateQuestion } from '../controllers/questionController.js';

const router = express.Router();

router.post("/", createQuestion)
    .post("/pushCollection", pushCollection)
    .get("/all/:interviewId", getInterviewQuestions)
    .get("/:id", getQuestion)
    .put("/:id", updateQuestion)
    .delete("/:id", deleteQuestion)

export default router;