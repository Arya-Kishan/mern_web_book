import { Error } from '../models/errorModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createError = AsyncHandler(async (req, res) => {
    if (req.headers['x-error-token'] != process.env.ERROR_TOKEN) {
        return res.status(400).json({ data: null, message: "Check error token" });
    }
    const doc = new Error(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating error")


export const getAllError = AsyncHandler(async (req, res) => {
    const doc = await Error.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user error")

export const getSingleError = AsyncHandler(async (req, res) => {
    const doc = await Error.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting single error")

export const getAllErrorOfUserId = AsyncHandler(async (req, res) => {
    const doc = await Error.find({ userId: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user error")

export const updateError = AsyncHandler(async (req, res) => {
    const doc = await Error.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating error')

export const deleteError = AsyncHandler(async (req, res) => {
    const doc = await Error.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting error")