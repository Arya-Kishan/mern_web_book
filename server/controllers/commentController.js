import { Comment } from '../models/commentModel.js'

export const createComment = async (req, res) => {
    try {
        const doc = new Comment(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW Comment");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getComments = async (req, res) => {
    try {
        console.log(req.params);
        const doc = await Comment.find({ questionId: req.params.id }).populate({
            path: 'userId',
            select: "name"
        });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN GETTING CommentS");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const updateComment = async (req, res) => {
    try {
        console.log(req.body);
        const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING CommentS");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}


export const deleteComment = async (req, res) => {
    try {
        console.log(req.body);
        const doc = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN DELETING CommentS");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}