import express from 'express'
import { createGlobalInterviewComment, deleteGlobalInterviewComment, getGlobalInterviewComments, updateGlobalInterviewComment } from '../../controllers/globalComments/globalInterviewCommentsController.js';

const router = express.Router();

router.post("/", createGlobalInterviewComment)
    .get("/:id", getGlobalInterviewComments)
    .put("/:id", updateGlobalInterviewComment)
    .delete("/:id", deleteGlobalInterviewComment)

export default router;