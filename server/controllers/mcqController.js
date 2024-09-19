import { Mcq } from '../models/mcqModel.js'
import { Options } from '../models/optionsModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createMcq = AsyncHandler(async (req, res) => {
    const doc = new Mcq(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating mcq")

export const updateMcq = AsyncHandler(async (req, res) => {
    const doc = await Mcq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating mcq')

export const deleteMcq = AsyncHandler(async (req, res) => {

    const doc1 = await Options.deleteMany({ mcqId: req.params.id });
    const doc = await Mcq.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting mcq')

export const getAllMcqsByUserId = AsyncHandler(async (req, res) => {
    const doc = await Mcq.find({ userId: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting all mcq of user')

export const getSingleMcq = AsyncHandler(async (req, res) => {
    const doc = await Mcq.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting single mcq')