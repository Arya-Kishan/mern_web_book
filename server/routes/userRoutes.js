import express from 'express'
import mongoose from 'mongoose'
import { checkUser, createUser, getAllUser, getSingleUser, loginUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/login", loginUser)
    .post("/signup", createUser)
    .put("/:id", updateUser)
    .get("/", getAllUser)
    .get("/single/:userId", getSingleUser)
    .get("/check", checkUser)

export default router;