import { Comment } from '../models/commentModel.js'
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createComment = AsyncHandler(async (req, res) => {
    const doc = new Comment(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating comment")

export const getComments = AsyncHandler(async (req, res) => {
    console.log(req.params);
    const doc = await Comment.find({ questionId: req.params.id }).populate({
        path: 'userId',
        select: "name"
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting comments of a question")

export const updateComment = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating comment')


export const deleteComment = AsyncHandler(async (req, res) => {
    const doc = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting comment')