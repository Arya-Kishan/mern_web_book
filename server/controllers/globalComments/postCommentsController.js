import { PostComments } from '../../models/globalComments/postCommentsModel.js'
import { Post } from '../../models/postModel.js';
import AsyncHandler from '../../utilis/AsyncHandler.js';

export const createPostComment = AsyncHandler(async (req, res) => {
    const newDoc = await PostComments.create(req.body);
    await Post.findByIdAndUpdate(newDoc.postId, { $push: { comments: newDoc._id } }, { new: true });
    res.status(200).json({ data: newDoc, message: "Success" });
}, "error in creating post comment")

export const getPostComments = AsyncHandler(async (req, res) => {
    console.log(req.params);
    const doc = await PostComments.find({ postId: req.params.id }).populate({
        path: 'userId',
        select: "name"
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting comments of a post")

export const updatePostComment = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = await PostComments.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating post comment')


export const deletePostComment = AsyncHandler(async (req, res) => {
    const doc = await PostComments.findByIdAndDelete(req.params.id);
    console.log(doc);
    await Post.findByIdAndUpdate(doc.postId, { $pull: { comments: doc._id } }, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting post comment')