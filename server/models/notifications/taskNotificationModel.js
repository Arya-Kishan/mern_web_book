import mongoose, { Schema } from 'mongoose'

const taskNotificationSchema = new Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    email: { type: String },
    title: { type: String },
    description: { type: String },
    reminder: { type: String, default: "" },
}, { timestamps: true })

export const TaskNotification = mongoose.model("TaskNotification", taskNotificationSchema);
