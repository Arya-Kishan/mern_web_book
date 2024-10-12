import express from 'express'
import { createPost, deletePost, getAllPosts, getSinglePost, getUserPosts, updatePost } from '../controllers/postController.js';
import { mixUpload } from '../middleware/Multer.js';

const router = express.Router();

router.post("/", mixUpload, createPost)
    .get("/single/:id", getSinglePost)
    .get("/all", getAllPosts)
    .get("/user/:id", getUserPosts)
    .put("/:id", updatePost)
    .delete("/:id", deletePost)

export default router;