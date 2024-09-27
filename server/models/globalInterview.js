import mongoose, { Schema } from 'mongoose'

const globalInterviewSchema = new Schema({
    title: { type: String },
    description: { type: String },
    interviewType: { type: String, default: "global" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    views: { type: Number, default: 0 },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'GlobalInterviewComments', default: [] },
}, { timestamps: true })

export const GlobalInterview = mongoose.model("GlobalInterview", globalInterviewSchema);
