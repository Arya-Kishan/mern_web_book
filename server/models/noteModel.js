import mongoose, { Schema } from 'mongoose'

const noteSchema = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Note = mongoose.model("Note", noteSchema);
