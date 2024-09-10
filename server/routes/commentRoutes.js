import express from 'express'
import { createComment, deleteComment, getComments, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.post("/", createComment)
    .get("/:id", getComments)
    .put("/:id", updateComment)
    .delete("/:id", deleteComment)

export default router;