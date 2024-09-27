import { GlobalInterview } from '../models/globalInterview.js';
import { Question } from '../models/questionModel.js'
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createQuestion = AsyncHandler(async (req, res) => {
    const doc = new Question(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in making new question")

export const getInterviewQuestions = AsyncHandler(async (req, res) => {
    const doc = await Question.find({ interviewId: req.params.interviewId });
    await increaseInterviewView(req.params.interviewId)
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting interview questions")


export const getQuestion = AsyncHandler(async (req, res) => {
    const doc = await Question.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single question")

export const updateQuestion = AsyncHandler(async (req, res) => {
    const doc = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating questions')


export const deleteQuestion = AsyncHandler(async (req, res) => {
    const doc = await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting question")


export const pushCollection = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const newDoc = await Question.insertMany(req.body);
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in pushing whole aaray question")


// extra functions

const increaseInterviewView = async (interviewId) => {
    const isInterviewGlobal = await GlobalInterview.findOne({ interviewId: interviewId });
    if (isInterviewGlobal) {
        await GlobalInterview.findByIdAndUpdate(isInterviewGlobal._id, { views: isInterviewGlobal.views + 1 })
    }
}