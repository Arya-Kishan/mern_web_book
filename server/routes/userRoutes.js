import express from 'express'
import mongoose from 'mongoose'
import { checkUser, createUser, getAllUser, getSingleUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/login", loginUser)
    .post("/signup", createUser)
    .get("/", getAllUser)
    .get("/single/:userId", getSingleUser)
    .get("/check", checkUser)

export default router;