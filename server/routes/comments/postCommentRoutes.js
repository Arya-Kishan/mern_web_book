import express from 'express'
import { createPostComment, deletePostComment, getPostComments, updatePostComment } from '../../controllers/globalComments/postCommentsController.js';

const router = express.Router();

router.post("/", createPostComment)
    .get("/:id", getPostComments)
    .put("/:id", updatePostComment)
    .delete("/:id", deletePostComment)

export default router;