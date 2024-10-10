import express from "express"
import { Server } from 'socket.io'
import { createServer } from 'http'
const PORT = 7000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

let userSocketMap = {};

io.on("connection", (socket) => {

    console.log("user connected : " + socket.id);

    const userId = socket.handshake.query.userId
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
        io.emit("onlineUsers", Object.keys(userSocketMap))
    }

    console.log(userSocketMap);

    socket.on("send-notification", ({ receiverId, category, message }) => {
        const receiverSocketId = userSocketMap[receiverId];
        io.to(receiverSocketId).emit("receive-notification", { category, message })
    })

    socket.on("send-message", ({ sender, receiver, message }) => {
        const receiverSocketId = userSocketMap[receiver._id];
        io.to(receiverSocketId).emit("receive-message", { sender, receiver, message })
        io.to(receiverSocketId).emit("someone-messaged", { sender, receiver, message })
    })

    socket.on("delivered", ({ sender, receiver, message }) => {
        const senderSocketId = userSocketMap[sender._id];
        io.to(senderSocketId).emit("receiver-received-message", { sender, receiver, message })
    })

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED : " + socket.id);
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap))
    })

})

app.get("/", (req, res) => {
    res.json({ heading: 'SOCKET FOR WEB BOOK' })
})


server.listen(PORT, () => {
    console.log(`SOCKET SERVER LISTENED AT : ` + PORT);
})