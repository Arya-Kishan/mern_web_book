import express from 'express'
import { createOptions, deleteOptions, getAllOptions, getOption, updateOptions } from '../controllers/optionsController.js';

const router = express.Router();

router.post("/", createOptions)
    .get("/all/:mcqId", getAllOptions)
    .get("/:id", getOption)
    .put("/:id", updateOptions)
    .delete("/:id", deleteOptions)

export default router;