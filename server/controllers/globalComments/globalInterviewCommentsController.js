import { GlobalInterviewComments } from '../../models/globalComments/globalInterviewComments.js'
import { GlobalInterview } from '../../models/globalInterview.js';
import AsyncHandler from '../../utilis/AsyncHandler.js';

export const createGlobalInterviewComment = AsyncHandler(async (req, res) => {
    const doc = new GlobalInterviewComments(req.body);
    const newDoc = await doc.save();
    await GlobalInterview.findByIdAndUpdate(newDoc.globalInterviewId, { $push: { comments: newDoc._id } }, { new: true });
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating comment")

export const getGlobalInterviewComments = AsyncHandler(async (req, res) => {
    console.log(req.params);
    const doc = await GlobalInterviewComments.find({ globalInterviewId: req.params.id }).populate({
        path: 'userId',
        select: "name"
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting comments of a question")

export const updateGlobalInterviewComment = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = await GlobalInterviewComments.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating comment')


export const deleteGlobalInterviewComment = AsyncHandler(async (req, res) => {
    const doc = await GlobalInterviewComments.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting comment')