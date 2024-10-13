import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file: {
        type: {
            fileType: { type: String, default: "", enum: ["image", "video"] },
            fileUrl: { type: String, default: "" },
            file_public_id: { type: String, default: "" },
        },
        default: {}
    },
    title: { type: String },
    description: { type: String },
    tags: { type: [String], default: [""] },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'PostComments', default: [] },
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema);
