import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    category: { type: String },
    action: { type: String, default: "", enum: ["liked", "commented", "added"] },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null },
    globalMcq: { type: mongoose.Schema.Types.ObjectId, ref: 'GlobalMcq', default: null },
    globalInterview: { type: mongoose.Schema.Types.ObjectId, ref: 'GlobalInterview', default: null },
}, { timestamps: true })

export const Notification = mongoose.model("Notification", notificationSchema);
