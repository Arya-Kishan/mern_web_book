import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    online: { type: String, default: String(Date.now()) },
    role: { type: String, default: 'user' },
    mychats: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    FCMtoken: {
        deviceToken: { type: String, default: 'null' },
        pushPermission: { type: String, default: "consentNeeded", enum: ["accepted", "rejected", "consentNeeded"] },
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);
