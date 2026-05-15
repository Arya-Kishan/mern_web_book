import express from "express";
import {
  createMessage,
  deleteConversationMessages,
  deleteMessage,
  getConversations,
  getUserChatLists,
  unseenMessage,
  updateMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router
  .post("/send", createMessage)
  .get("/getMessages", getConversations)
  .get("/getChatLists", getUserChatLists)
  .post("/unseenMessages", unseenMessage)
  .post("/updateMessage", updateMessage)
  .post("/deleteMessage", deleteMessage)
  .delete("/deleteConversationMessages/:id", deleteConversationMessages);

export default router;
