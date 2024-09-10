import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({
    comment: { type: String },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema);
