import mongoose, { Schema } from 'mongoose'

const documentSchema = new Schema({
    document: { type: String },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Document = mongoose.model("Document", documentSchema);
