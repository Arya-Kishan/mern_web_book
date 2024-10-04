import { GlobalMcq } from '../models/globalMcq.js';
import { Options } from '../models/optionsModel.js'
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createOptions = AsyncHandler(async (req, res) => {
    const doc = new Options(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, 'error in creating options')

export const getAllOptions = AsyncHandler(async (req, res) => {
    const doc = await Options.find({ mcqId: req.params.mcqId });
    await increaseMcqView(req.params.mcqId);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in getting all options')

export const getOption = AsyncHandler(async (req, res) => {
    const doc = await Options.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting option")

export const updateOptions = AsyncHandler(async (req, res) => {
    const doc = await Options.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating option')


export const deleteOptions = AsyncHandler(async (req, res) => {
    const doc = await Options.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting options')


// extra functions

const increaseMcqView = async (mcqId) => {
    const isMcqGlobal = await GlobalMcq.findOne({ mcqId: mcqId });
    if (isMcqGlobal) {
        await GlobalMcq.findByIdAndUpdate(isMcqGlobal._id, { views: isMcqGlobal.views + 1 })
    }
}