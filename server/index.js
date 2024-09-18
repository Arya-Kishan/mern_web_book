import express from 'express'
import 'dotenv/config'
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import mcqRoutes from './routes/mcqRoutes.js'
import interviewRoutes from './routes/interviewRoutes.js'
import globalInterviewRoutes from './routes/GlobalInterviewRoutes.js'
import globalMcqRoutes from './routes/GlobalMcqRoutes.js'
import documentRoutes from './routes/documentRoute.js'
import optionsRoutes from './routes/optionsRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import taskNotificationRoutes from './routes/notifications/taskNotificationRoutes.js'
import { dbConnection } from './databse.js'


const server = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
    message: JSON.stringify({ data: null, message: 'received too many' })
})


server.use(express.json({ limit: '50kb' }));
server.use(cors({
    exposedHeaders: ["X-jwt-routes"],
}));
server.use(limiter);

server.use("/user", userRoutes)
server.use("/questions", questionRoutes)
server.use("/note", noteRoutes)
server.use("/task", taskRoutes)
server.use("/mcq", mcqRoutes)
server.use("/interview", interviewRoutes)
server.use("/globalInterview", globalInterviewRoutes)
server.use("/globalMcq", globalMcqRoutes)
server.use("/document", documentRoutes)
server.use("/options", optionsRoutes)
server.use("/comment", commentRoutes)
server.use("/notification/task", taskNotificationRoutes)

server.get("/", (req, res) => {
    res.json({ name: "arya" });
})

dbConnection();

server.listen(8000, () => {
    console.log("SERVER LISTENED AT 8000");
})