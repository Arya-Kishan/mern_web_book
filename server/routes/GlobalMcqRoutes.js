import express from 'express'
import { deleteGlobalMcq, getAllGlobalMcqs, globalUpdateMcq, makeGlobalMcq } from '../controllers/globalMcqController.js';
const router = express.Router();

router.post("/", makeGlobalMcq)
    .get("/", getAllGlobalMcqs)
    .put("/:id", globalUpdateMcq)
    .delete("/:id", deleteGlobalMcq)

export default router;