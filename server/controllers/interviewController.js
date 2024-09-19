import { Interview } from '../models/interviewModel.js'
import { Question } from '../models/questionModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createInterview = AsyncHandler(async (req, res) => {
    const doc = new Interview(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, 'error in creating interview')

export const updateInterview = AsyncHandler(async (req, res) => {
    const doc = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating interview')

export const deleteInterview = AsyncHandler(async (req, res) => {
    const doc1 = await Question.deleteMany({ interviewId: req.params.id });
    const doc = await Interview.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting interview')

export const getAllInterviewsByUserId = AsyncHandler(async (req, res) => {
    const doc = await Interview.find({ userId: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all interview of user")

export const getSingleInterview = AsyncHandler(async (req, res) => {
    const doc = await Interview.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting single mcq')