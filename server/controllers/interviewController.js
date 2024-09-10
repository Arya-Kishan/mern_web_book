import { Interview } from '../models/interviewModel.js'
import { Question } from '../models/questionModel.js';

export const createInterview = async (req, res) => {
    try {
        const doc = new Interview(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW Interview");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const updateInterview = async (req, res) => {
    try {
        const doc = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING Interview");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const deleteInterview = async (req, res) => {
    try {
        const doc1 = await Question.deleteMany({ interviewId: req.params.id });
        const doc = await Interview.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN DELETING Interview");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getAllInterviewsByUserId = async (req, res) => {
    try {
        const doc = await Interview.find({ userId: req.params.userId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all InterviewS");
        res.status(400).json({ data: null, message: error });
    }
}

export const getSingleInterview = async (req, res) => {
    try {
        const doc = await Interview.findById(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all InterviewS");
        res.status(400).json({ data: null, message: error });
    }
}