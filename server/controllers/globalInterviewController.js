import { GlobalInterview } from '../models/globalInterview.js';
import { Interview } from '../models/interviewModel.js';


// MAKING INTERVIEW INTO GLOBAL
export const makeGlobalInterview = async (req, res) => {
    try {
        const doc1 = await Interview.findByIdAndUpdate(req.body.interviewId, { isGlobal: true });
        const doc = new GlobalInterview(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW GLOBAL Interview");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

// GETTING ALL GLOBAL INTERVIEW
export const getAllGlobalInterviews = async (req, res) => {
    try {
        const doc = await GlobalInterview.find();
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all InterviewS");
        res.status(400).json({ data: null, message: error });
    }
}

// DELETING GLOBAL INTERVIEW
export const deleteGlobalInterview = async (req, res) => {
    try {
        const doc1 = await GlobalInterview.findById(req.params.id);
        const doc2 = await Interview.findByIdAndUpdate(doc1.interviewId, { isGlobal: false }, { new: true });
        const doc = await GlobalInterview.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN DELETING GLOBAL Interview");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}