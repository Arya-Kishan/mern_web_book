import mongoose, { Schema } from 'mongoose'

const postCommentsSchema = new Schema({
    comment: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const PostComments = mongoose.model("PostComments", postCommentsSchema);
