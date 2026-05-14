import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: { type: String, default: "text", enum: ["text", "image", "video"] },
      value: { type: String, default: "" },
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    deliveredAt: { type: Date || null, default: null },
    seenAt: { type: Date || null, default: null },
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messageModel);
