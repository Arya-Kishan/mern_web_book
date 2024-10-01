import express from 'express'
import mongoose from 'mongoose'
import { createError, deleteError, getAllError, getAllErrorOfUserId, updateError } from '../controllers/errorController.js';

const router = express.Router();

router.post("/", createError)
    .get("/all", getAllError)
    .get("/:id", getAllErrorOfUserId)
    .put("/:id", updateError)
    .delete("/:id", deleteError)

export default router;