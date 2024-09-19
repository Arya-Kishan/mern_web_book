import { GlobalMcq } from '../models/globalMcq.js';
import { Mcq } from '../models/mcqModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';


// MAKING INTERVIEW INTO GLOBAL
export const makeGlobalMcq = AsyncHandler(async (req, res) => {
    const doc1 = await Mcq.findByIdAndUpdate(req.body.mcqId, { isGlobal: true });
    const doc = new GlobalMcq(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, 'error in making global mcq')

// GETTING ALL GLOBAL INTERVIEW
export const getAllGlobalMcqs = AsyncHandler(async (req, res) => {
    const doc = await GlobalMcq.find();
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting all global mcq')

// DELETING GLOBAL INTERVIEW
export const deleteGlobalMcq = AsyncHandler(async (req, res) => {
    const doc1 = await GlobalMcq.findById(req.params.id);
    const doc2 = await Mcq.findByIdAndUpdate(doc1.mcqId, { isGlobal: false }, { new: true });
    const doc = await GlobalMcq.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting mcq')