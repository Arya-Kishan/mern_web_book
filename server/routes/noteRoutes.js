import express from 'express'
import { createNote, deleteNote, updateNote, getAllNotesByUserId, getSingleNote } from '../controllers/noteController.js';
const router = express.Router();

router.post("/", createNote)
    .get("/all/:userId", getAllNotesByUserId)
    .get("/:id", getSingleNote)
    .put("/:id", updateNote)
    .delete("/:id", deleteNote)

export default router;