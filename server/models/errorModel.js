import mongoose, { Schema } from 'mongoose'

const errorSchema = new Schema({
    error: { type: String, require: true },
    errorMessage: { type: String, require: true },
    errorInComponent: { type: String, default: "" },
    errorFrom: { type: String, default: "" },
}, { timestamps: true })

export const Error = mongoose.model("Error", errorSchema);
