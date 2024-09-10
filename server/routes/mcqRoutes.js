import express from 'express'
import { createMcq, deleteMcq, getAllMcqsByUserId, getSingleMcq, updateMcq } from '../controllers/mcqController.js';
const router = express.Router();

router.post("/", createMcq)
    .get("/all/:userId", getAllMcqsByUserId)
    .get("/:id", getSingleMcq)
    .put("/:id", updateMcq)
    .delete("/:id", deleteMcq)

export default router;