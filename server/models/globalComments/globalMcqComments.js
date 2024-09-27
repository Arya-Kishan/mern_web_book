import mongoose, { Schema } from 'mongoose'

const globalMcqCommentsSchema = new Schema({
    comment: { type: String },
    globalMcqId: { type: mongoose.Schema.Types.ObjectId, ref: "GlobalMcq" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const GlobalMcqComments = mongoose.model("GlobalMcqComments", globalMcqCommentsSchema);
