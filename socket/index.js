import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { dbConnection } from "./database.js";
import { updateConversationMessages } from "./controllers/messageController.js";
import { sendOnlineNotiToAdmin } from "./controllers/userController.js";
const PORT = 7000;

const app = express();
const server = createServer(app);

dbConnection();

app.use(
  cors({
    exposedHeaders: ["x-webbook-jwt-routes"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

export let userSocketMap = {};

export const getSocketIdByUserId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  console.log("user connected : " + socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(userSocketMap));
    updateConversationMessages({
      conversationId: null,
      userId,
      type: "deliveredAt",
    });
    sendOnlineNotiToAdmin({
      category: "💕ONLINE💕",
      message: "You will receive notifications here when you are online",
      data: { activeUsers: Object.keys(userSocketMap) },
    });
  }

  console.log(userSocketMap);

  socket.on("send-notification", ({ receiverId, category, message }) => {
    const receiverSocketId = userSocketMap[receiverId];
    io.to(receiverSocketId).emit("receive-notification", { category, message });
  });

  socket.on("send-message", ({ sender, receiver, message }) => {
    const receiverSocketId = userSocketMap[receiver._id];
    const senderSocketId = userSocketMap[sender._id];

    const onlineUsers = Object.keys(userSocketMap);
    const isOpponentOnline = onlineUsers.includes(receiver._id);
    console.log("IS OPPONENT ONLINE: ", isOpponentOnline);

    const messageData = {
      sender,
      receiver,
      message,
      createdAt: new Date().toISOString(),
      ...(isOpponentOnline && { deliveredAt: new Date().toISOString() }),
    };

    io.to(receiverSocketId).emit("receive-message", messageData);
    io.to(receiverSocketId).emit("someone-messaged", {
      sender,
      receiver,
      message,
    });

    io.to(senderSocketId).emit("message-status", {
      messageData,
    });
  });

  socket.on("typing", async (data) => {
    const receiverSocketId = userSocketMap[data.receiver._id];
    io.to(receiverSocketId).emit("typing", data);
  });

  socket.on("bubble-emit", async (data) => {
    const receiverSocketId = userSocketMap[data.receiver._id];
    console.log("buuble listen", data);
    io.to(receiverSocketId).emit("bubble-listen", data);
  });

  socket.on(
    "send-changed-conversationType",
    ({ sender, receiver, conversationType }) => {
      const receiverSocketId = userSocketMap[receiver._id];
      io.to(receiverSocketId).emit("receive-changed-conversationType", {
        sender,
        receiver,
        conversationType,
      });
    },
  );

  socket.on("send-game", ({ sender, receiver, category, game, data }) => {
    console.log({ sender, receiver });
    const receiverSocketId = userSocketMap[receiver._id];
    console.log(receiverSocketId);
    io.to(receiverSocketId).emit("receive-game", {
      sender,
      receiver,
      category,
      game,
      data,
    });
  });

  socket.on(
    "send-game-notification",
    ({ sender, receiver, game, message, data }) => {
      const receiverSocketId = userSocketMap[receiver._id];
      console.log(receiverSocketId);
      io.to(receiverSocketId).emit("receive-game-notification", {
        sender,
        receiver,
        game,
        message,
        data,
      });
    },
  );

  socket.on(
    "send-game-player-joined",
    ({ sender, receiver, category, game, data }) => {
      const receiverSocketId = userSocketMap[receiver._id];
      const senderSocketId = userSocketMap[sender._id];
      console.log(receiverSocketId);
      io.to(receiverSocketId).emit("receive-game-player-joined", {
        sender,
        receiver,
        category,
        game,
        data,
        firstTurn: receiver,
      });
      io.to(senderSocketId).emit("receive-game-player-joined", {
        sender: receiver,
        receiver: sender,
        category,
        game,
        data,
        firstTurn: receiver,
      });
    },
  );

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED : " + socket.id);
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/socket/user", userRouter);
app.use("/socket/message", messageRouter);

app.get("/", (req, res) => {
  res.json({ heading: "SOCKET FOR WEB BOOK" });
});

server.listen(PORT, () => {
  console.log(`SOCKET SERVER LISTENED AT : ` + PORT);
});
