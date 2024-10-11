import { Post } from '../models/postModel.js'
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createPost = AsyncHandler(async (req, res) => {
    const doc = await Post.create(req.body);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in making new post")

export const getUserPosts = AsyncHandler(async (req, res) => {
    const doc = await Post.find({ userId: req.params.id });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user posts")

export const getSinglePost = AsyncHandler(async (req, res) => {
    const doc = await Post.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user posts")


export const getAllPosts = AsyncHandler(async (req, res) => {
    console.log(req.query);
    const doc = await Post.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all ppsts")

export const updatePost = AsyncHandler(async (req, res) => {
    const doc = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating post')

// have to delete image urlo from cloudinary
export const deletePost = AsyncHandler(async (req, res) => {
    const doc = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting post")