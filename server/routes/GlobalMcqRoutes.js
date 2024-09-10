import express from 'express'
import { deleteGlobalMcq, getAllGlobalMcqs, makeGlobalMcq } from '../controllers/globalMcqController.js';
const router = express.Router();

router.post("/", makeGlobalMcq)
    .get("/", getAllGlobalMcqs)
    .delete("/:id", deleteGlobalMcq)

export default router;