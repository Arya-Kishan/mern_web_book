import { Post } from '../models/postModel.js'
import { deleteFile, getAudioUrl, getImageUrl, getVideoUrl } from '../services/Cloudinary.js';
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createPost = AsyncHandler(async (req, res) => {

    if (req.body.file !== undefined) {
        const doc = await Post.create({ ...req.body, tags: req.body.tags.split(","), file: JSON.parse(req.body.file) });
        res.status(200).json({ data: doc, message: "Success" });
        return true;
    }

    const result = await fileUrl(req.body.fileType, req.files);

    if (!result.success) {
        res.status(400).json({ data: "CLOUDINARY URL NOT CREATED", message: "clouidinary error" });
        return false;
    }

    let newDoc = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags.split(","),
        file: {
            fileType: req.body.fileType,
            fileUrl: result.url,
            file_public_id: result.public_id
        }
    }

    const doc = await Post.create(newDoc);
    res.status(200).json({ data: doc, message: "Success" });

}, "error in making new post")

export const getUserPosts = AsyncHandler(async (req, res) => {
    const doc = await Post.find({ userId: req.params.id }).populate({
        path: 'userId',
        select: "name",
    }).populate({
        path: 'likes',
        select: "name",
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user posts")

export const getSinglePost = AsyncHandler(async (req, res) => {
    const doc = await Post.findById(req.params.id).populate({
        path: 'userId',
        select: "name",
    }).populate({
        path: 'likes',
        select: "name",
    });
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting user posts")


export const getAllPosts = AsyncHandler(async (req, res) => {
    let query = Post.find();

    if (req.query.page && req.query.limit) {
        query = query.find().skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    }

    if (req.query.page && req.query.limit && req.query.tags) {
        query = query.find({ tags: { $in: JSON.parse(req.query.tags) } }).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    }

    if (JSON.stringify(req.query) == "{}") {
        query = query.find();
    }


    const doc = await query.populate({
        path: 'userId',
        select: "name",
    }).populate({
        path: 'likes',
        select: "name",
    });
    res.status(200).json({ data: doc, message: "Success" });

}, "error in getting all posts")

export const updatePost = AsyncHandler(async (req, res) => {

    console.log(req.body);
    console.log(req.files);
    console.log(req.query);

    if (req.query.category == "likes" && req.query.type == "add") {
        let updatedDoc = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.body?.likes } }, { new: true });
        return res.status(200).json({ data: updatedDoc, message: "Success" });
    }

    if (req.query.category == "likes" && req.query.type == "delete") {
        let updatedDoc = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body?.likes } }, { new: true });
        return res.status(200).json({ data: updatedDoc, message: "Success" });
    }

    if (req.query.category == "update") {

        console.log(req.body.doc?.file);

        if (req.body.public_id) {
            console.log("updatimg file only");
            let updatedDoc = await Post.findByIdAndUpdate(req.params.id, { ...req.body, tags: req.body.tags.split(","), file: JSON.parse(req.body.file) }, { new: true });
            return res.status(200).json({ data: updatedDoc, message: "Success" });
        }

        console.log("updatimg image or video and getting new url and also deleting file from cloudfinary");

        const result = await fileUrl(req.body.fileType, req.files);
        await deleteFile(req.body.public_id);

        if (!result.success) {
            res.status(400).json({ data: "CLOUDINARY URL NOT UPDATED", message: "clouidinary error" });
            return false;
        }

        let newDoc = {
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags.split(","),
            file: {
                fileType: req.body.fileType,
                fileUrl: result.url,
                file_public_id: result.public_id
            }
        }

        let updatedDoc = await Post.findByIdAndUpdate(req.params.id, newDoc, { new: true });

        res.status(200).json({ data: updatedDoc, message: "Success" });
        return 0;



    }

    res.status(200).json({ data: 'updatedDoc', message: "Success" });

}, 'error in updating post')

// have to delete image urlo from cloudinary
export const deletePost = AsyncHandler(async (req, res) => {

    if (req.query.public_id) {
        await deleteFile(req.query.public_id);
        const doc = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } else {
        const doc = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    }
}, "error in deleting post")

const fileUrl = async (fileType, file) => {

    if (fileType == "image") {
        return getImageUrl(file.image[0])
    }

    if (fileType == "video") {
        return getVideoUrl(file.video[0])
    }

    if (fileType == "audio") {
        return getAudioUrl(file.audio[0])
    }

}