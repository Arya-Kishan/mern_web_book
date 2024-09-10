import mongoose, { Schema } from 'mongoose'

const interviewSchema = new Schema({
    title: { type: String },
    description: { type: String },
    isGlobal: { type: Boolean, default: false },
    interviewType: { type: String, default: "personal" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Interview = mongoose.model("Interview", interviewSchema);
