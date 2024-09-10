import mongoose, { Schema } from 'mongoose'

const globalInterviewSchema = new Schema({
    title: { type: String },
    description: { type: String },
    interviewType: { type: String, default: "global" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    likes: { type: Number, default: 0 },
}, { timestamps: true })

export const GlobalInterview = mongoose.model("GlobalInterview", globalInterviewSchema);
