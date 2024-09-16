import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema({
    title: { type: String },
    description: { type: String },
    reminder: { type: String, default: "" },
    notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskNotification' },
    condition: { type: String, default: "completed" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Task = mongoose.model("Task", taskSchema);
