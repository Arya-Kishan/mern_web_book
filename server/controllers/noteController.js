import { Note } from '../models/noteModel.js'

export const createNote = async (req, res) => {
    try {
        console.log(req.body);
        const doc = new Note(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW NOTE");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const updateNote = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params.id);
        const doc = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING NOTE");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const deleteNote = async (req, res) => {
    try {

        const doc = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });

    } catch (error) {
        console.log("ERROR IN DELETING NOTE");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getAllNotesByUserId = async (req, res) => {
    try {
        const doc = await Note.find({ userId: req.params.userId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all NOTES");
        res.status(400).json({ data: null, message: error });
    }
}

export const getSingleNote = async (req, res) => {
    try {
        const doc = await Note.findById(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all NOTES");
        res.status(400).json({ data: null, message: error });
    }
}