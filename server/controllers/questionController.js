import { Question } from '../models/questionModel.js'

export const createQuestion = async (req, res) => {
    try {
        const doc = new Question(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN MAKING NEW QUESTION" });
    }
}

export const getInterviewQuestions = async (req, res) => {
    try {
        const doc = await Question.find({ interviewId: req.params.interviewId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN GETTING QUESTIONS" });
    }
}


export const getQuestion = async (req, res) => {
    try {
        const doc = await Question.findById(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN GETTING QUESTIONS" });
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const doc = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN UPDATING QUESTIONS" });
    }
}


export const deleteQuestion = async (req, res) => {
    try {
        const doc = await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN DELETING QUESTIONS" });
    }
}


export const pushCollection = async (req, res) => {
    try {
        console.log(req.body);
        const newDoc = await Question.insertMany(req.body);
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN PUSHING WHOLE ARRAY COLLECTION" });
    }
}