import mongoose, { Schema } from 'mongoose'

const questionSchema = new Schema({
    question: { type: String, require: true },
    answer: { type: String, require: true },
    youtubeUrl: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Question = mongoose.model("Question", questionSchema);
