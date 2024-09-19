import { GlobalInterview } from '../models/globalInterview.js';
import { Interview } from '../models/interviewModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';


// MAKING INTERVIEW INTO GLOBAL
export const makeGlobalInterview = AsyncHandler(async (req, res) => {
    const doc1 = await Interview.findByIdAndUpdate(req.body.interviewId, { isGlobal: true });
    const doc = new GlobalInterview(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, 'error in creating global interview')

// GETTING ALL GLOBAL INTERVIEW
export const getAllGlobalInterviews = AsyncHandler(async (req, res) => {
    const doc = await GlobalInterview.find();
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting all global interview')

// DELETING GLOBAL INTERVIEW
export const deleteGlobalInterview = AsyncHandler(async (req, res) => {
    const doc1 = await GlobalInterview.findById(req.params.id);
    const doc2 = await Interview.findByIdAndUpdate(doc1.interviewId, { isGlobal: false }, { new: true });
    const doc = await GlobalInterview.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting global interview')