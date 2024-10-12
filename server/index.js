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
import errorRoutes from './routes/errorRoutes.js'
import globalInterviewCommentRoutes from './routes/comments/globalInterviewCommentRoutes.js'
import globalMcqCommentRoutes from './routes/comments/globalMcqCommentRoutes.js'
import postCommentRoutes from './routes/comments/postCommentRoutes.js'
import taskNotificationRoutes from './routes/notifications/taskNotificationRoutes.js'
import notificationRoutes from './routes/notifications/notificationRoute.js'
import postRoutes from './routes/postRoutes.js'
import { dbConnection } from './databse.js'
import { jwtAuthenticateUser } from './middleware/JwtAuthentication.js'
import sendNotificationFCM from './services/FirebaseFCM.js'

const server = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
    message: JSON.stringify({ data: null, message: 'received too many' })
})


server.use(express.json({ limit: '50kb' }));
server.use(cors({
    exposedHeaders: ["x-webbook-jwt-routes"],
}));
server.use(limiter);

dbConnection();

server.use("/user", userRoutes)
server.use("/questions", jwtAuthenticateUser, questionRoutes)
server.use("/note", jwtAuthenticateUser, noteRoutes)
server.use("/task", jwtAuthenticateUser, taskRoutes)
server.use("/mcq", jwtAuthenticateUser, mcqRoutes)
server.use("/interview", jwtAuthenticateUser, interviewRoutes)
server.use("/globalInterview", jwtAuthenticateUser, globalInterviewRoutes)
server.use("/globalMcq", jwtAuthenticateUser, globalMcqRoutes)
server.use("/document", jwtAuthenticateUser, documentRoutes)
server.use("/options", jwtAuthenticateUser, optionsRoutes)
server.use("/comment", jwtAuthenticateUser, commentRoutes)
server.use("/globalInterviewComment", jwtAuthenticateUser, globalInterviewCommentRoutes)
server.use("/globalMcqComment", jwtAuthenticateUser, globalMcqCommentRoutes)
server.use("/postComment", jwtAuthenticateUser, postCommentRoutes)
server.use("/error", errorRoutes)
server.use("/notification/task", taskNotificationRoutes)
server.use("/notification/global", notificationRoutes)
server.use("/post", postRoutes)

server.get("/", (req, res) => {
    res.json({ name: "MADE BY ARYA KISHAN WEBBOOK MULTI SAGA" });
})

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ data: null, message: err.message || "something went wrong" });
})

server.listen(8000, () => {
    console.log("SERVER LISTENED AT 8000");
})