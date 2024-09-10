import mongoose, { Schema } from 'mongoose'

const optionsSchema = new Schema({
    question: { type: String, require: true },
    answer: { type: String, require: true },
    options: {
        type: [String],
        default: []
    },
    mcqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export const Options = mongoose.model("Options", optionsSchema);
