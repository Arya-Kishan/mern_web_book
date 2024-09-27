import express from 'express'
import { createGlobalMcqComment, deleteGlobalMcqComment, getGlobalMcqComments, updateGlobalMcqComment } from '../../controllers/globalComments/globalMcqCommentsController.js';

const router = express.Router();

router.post("/", createGlobalMcqComment)
    .get("/:id", getGlobalMcqComments)
    .put("/:id", updateGlobalMcqComment)
    .delete("/:id", deleteGlobalMcqComment)

export default router;