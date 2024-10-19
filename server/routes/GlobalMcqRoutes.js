import express from 'express'
import { deleteGlobalMcq, getAllGlobalMcqs, getSingleMcq, globalUpdateMcq, makeGlobalMcq } from '../controllers/globalMcqController.js';
const router = express.Router();

router.post("/", makeGlobalMcq)
    .get("/", getAllGlobalMcqs)
    .get("/single/:id", getSingleMcq)
    .put("/:id", globalUpdateMcq)
    .delete("/:id", deleteGlobalMcq)

export default router;