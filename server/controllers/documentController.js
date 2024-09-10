import { Document } from '../models/documentModel.js'

export const createDocument = async (req, res) => {
    try {
        console.log(req.body);
        const doc = new Document(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW Document");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const updateDocument = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params.id);
        const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING Document");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const deleteDocument = async (req, res) => {
    try {

        const doc = await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });

    } catch (error) {
        console.log("ERROR IN DELETING Document");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getAllDocumentsByUserId = async (req, res) => {
    try {
        const doc = await Document.find({ userId: req.params.userId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all DocumentS");
        res.status(400).json({ data: null, message: error });
    }
}

export const getSingleDocument = async (req, res) => {
    try {
        const doc = await Document.find({ noteId: req.params.id });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all DocumentS");
        res.status(400).json({ data: null, message: error });
    }
}