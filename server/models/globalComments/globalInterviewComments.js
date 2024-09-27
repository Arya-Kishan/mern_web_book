import mongoose, { Schema } from 'mongoose'

const globalInterviewCommentsSchema = new Schema({
    comment: { type: String },
    globalInterviewId: { type: mongoose.Schema.Types.ObjectId, ref: "GlobalInterview" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const GlobalInterviewComments = mongoose.model("GlobalInterviewComments", globalInterviewCommentsSchema);
