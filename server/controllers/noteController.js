import { Note } from '../models/noteModel.js'
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createNote = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = new Note(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });

}, "error in creating note")

export const updateNote = AsyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    const doc = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating note')

export const deleteNote = AsyncHandler(async (req, res) => {
    const doc = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });

}, 'error in deleting note')

export const getAllNotesByUserId = AsyncHandler(async (req, res) => {
    const doc = await Note.find({ userId: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting all note of a user')

export const getSingleNote = AsyncHandler(async (req, res) => {
    const doc = await Note.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting single note')