import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 'user' },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);
