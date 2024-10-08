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

    socket.on("send-notification", ({ receiverId, message }) => {
        console.log("SECDING NOTIFICATION TO : " + receiverId);
        const receiverSocketId = userSocketMap[receiverId];
        console.log(receiverSocketId);
        io.to(receiverSocketId).emit("receive-notification", message)
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