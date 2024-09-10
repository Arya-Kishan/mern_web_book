import { Task } from '../models/taskModel.js'

export const createTask = async (req, res) => {
    try {
        const doc = new Task(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW TASK");
        console.log(error);
        res.status(400).json({ data: null, message: error });
    }
}

export const updateTask = async (req, res) => {
    try {
        const doc = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING TASK");
        console.log(error);
        res.status(400).json({ data: null, message: error });
    }
}

export const deleteTask = async (req, res) => {
    try {

        const doc = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });

    } catch (error) {
        console.log("ERROR IN DELETING Task");
        console.log(error);
        res.status(400).json({ data: null, message: error });
    }
}

export const getAllTaskByUserId = async (req, res) => {
    try {
        const doc = await Task.find({ userId: req.params.userId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all TASK");
        res.status(400).json({ data: null, message: error });
    }
}

export const getSingleTask = async (req, res) => {
    try {
        const doc = await Task.findById(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN GETTING SINGLE TASK BY TASK ID");
        res.status(400).json({ data: null, message: error });
    }
}