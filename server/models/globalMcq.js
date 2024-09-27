import mongoose, { Schema } from 'mongoose'

const globalMcqSchema = new Schema({
    title: { type: String },
    description: { type: String },
    mcqType: { type: String, default: "global" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    mcqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mcq', require: true },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    views: { type: Number, default: 0 },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'GlobalMcqComments', default: [] },
}, { timestamps: true })

export const GlobalMcq = mongoose.model("GlobalMcq", globalMcqSchema);
