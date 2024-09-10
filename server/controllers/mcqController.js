import { Mcq } from '../models/mcqModel.js'
import { Options } from '../models/optionsModel.js';

export const createMcq = async (req, res) => {
    try {
        const doc = new Mcq(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW Mcq");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const updateMcq = async (req, res) => {
    try {
        const doc = await Mcq.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING Mcq");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const deleteMcq = async (req, res) => {
    try {

        const doc1 = await Options.deleteMany({ mcqId: req.params.id });
        const doc = await Mcq.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });

    } catch (error) {
        console.log("ERROR IN DELETING Mcq");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getAllMcqsByUserId = async (req, res) => {
    try {
        const doc = await Mcq.find({ userId: req.params.userId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all McqS");
        res.status(400).json({ data: null, message: error });
    }
}

export const getSingleMcq = async (req, res) => {
    try {
        const doc = await Mcq.findById(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all McqS");
        res.status(400).json({ data: null, message: error });
    }
}