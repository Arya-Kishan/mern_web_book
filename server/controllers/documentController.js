import { Document } from '../models/documentModel.js'
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createDocument = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = new Document(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, 'error in creating document notes')

export const updateDocument = AsyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating document')

export const deleteDocument = AsyncHandler(async (req, res) => {
    const doc = await Document.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting document")

export const getAllDocumentsByUserId = AsyncHandler(async (req, res) => {
    const doc = await Document.find({ userId: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all document of user")

export const getSingleDocument = AsyncHandler(async (req, res) => {
    const doc = await Document.find({ noteId: req.params.id });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single document")