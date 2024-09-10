import mongoose, { Schema } from 'mongoose'

const mcqSchema = new Schema({
    title: { type: String },
    description: { type: String },
    isGlobal: { type: Boolean, default: false },
    mcqType: { type: String, default: "personal" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Mcq = mongoose.model("Mcq", mcqSchema);
