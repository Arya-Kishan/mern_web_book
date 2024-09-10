import mongoose, { Schema } from 'mongoose'

const globalMcqSchema = new Schema({
    title: { type: String },
    description: { type: String },
    mcqType: { type: String, default: "global" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    mcqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mcq', require: true },
    likes: { type: Number, default: 0 },
}, { timestamps: true })

export const GlobalMcq = mongoose.model("GlobalMcq", globalMcqSchema);
