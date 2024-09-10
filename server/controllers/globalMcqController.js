import { GlobalMcq } from '../models/globalMcq.js';
import { Mcq } from '../models/mcqModel.js';


// MAKING INTERVIEW INTO GLOBAL
export const makeGlobalMcq = async (req, res) => {
    try {

        const doc1 = await Mcq.findByIdAndUpdate(req.body.mcqId, { isGlobal: true });
        const doc = new GlobalMcq(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW GLOBAL MCQ");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

// GETTING ALL GLOBAL INTERVIEW
export const getAllGlobalMcqs = async (req, res) => {
    try {
        const doc = await GlobalMcq.find();
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all MCQ");
        res.status(400).json({ data: null, message: error });
    }
}

// DELETING GLOBAL INTERVIEW
export const deleteGlobalMcq = async (req, res) => {
    try {
        const doc1 = await GlobalMcq.findById(req.params.id);
        const doc2 = await Mcq.findByIdAndUpdate(doc1.mcqId, { isGlobal: false }, { new: true });
        const doc = await GlobalMcq.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN DELETING GLOBAL MCQ");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}