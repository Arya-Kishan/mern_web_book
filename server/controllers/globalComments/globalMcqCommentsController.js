import { GlobalMcqComments } from '../../models/globalComments/globalMcqComments.js'
import { GlobalMcq } from '../../models/globalMcq.js';
import AsyncHandler from '../../utilis/AsyncHandler.js';

export const createGlobalMcqComment = AsyncHandler(async (req, res) => {
    const doc = new GlobalMcqComments(req.body);
    const newDoc = await doc.save();
    await GlobalMcq.findByIdAndUpdate(newDoc.globalMcqId, { $push: { comments: newDoc._id } }, { new: true });
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating comment")

export const getGlobalMcqComments = AsyncHandler(async (req, res) => {
    console.log(req.params);
    const doc = await GlobalMcqComments.find({ globalMcqId: req.params.id }).populate({
        path: 'userId',
        select: "name"
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting comments of a question")

export const updateGlobalMcqComment = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = await GlobalMcqComments.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating comment')


export const deleteGlobalMcqComment = AsyncHandler(async (req, res) => {
    const doc = await GlobalMcqComments.findByIdAndDelete(req.params.id);
    console.log(doc);
    await GlobalMcq.findByIdAndUpdate(doc.globalMcqId, { $pull: { comments: doc._id } }, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting comment')