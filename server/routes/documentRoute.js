import express from 'express'
import { createDocument, deleteDocument, getAllDocumentsByUserId, getSingleDocument, updateDocument } from '../controllers/documentController.js';
const router = express.Router();

router.post("/", createDocument)
    .get("/all/:userId", getAllDocumentsByUserId)
    .get("/:id", getSingleDocument)
    .put("/:id", updateDocument)
    .delete("/:id", deleteDocument)

export default router;