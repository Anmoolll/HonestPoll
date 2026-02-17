import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { CLIENT_URL, PORT } from './config/veriables.js';
import { connectDB } from './config/dbConfig.js';
import userRouter from './routes/v1/user.route.js';
import swaggerDocs from '../swagger.js';
import swaggerUi from 'swagger-ui-express';
import cookieParser from "cookie-parser";
import pollRouter from './routes/v1/poll.route.js';
import { handlePollSocket } from './socket/poll.socket.js';
import voteRouter from './routes/v1/vote.route.js';

const app = express();
const httpServer = createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const normalizeOrigin = (value) => {
    if (!value || typeof value !== "string") return value;
    return value.replace(/\/+$/, "");
};

const allowedOrigins = [CLIENT_URL].filter(Boolean).map(normalizeOrigin);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser clients (curl, server-to-server) with no Origin header.
        if (!origin) return callback(null, true);

        const normalized = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalized)) return callback(null, true);

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    optionsSuccessStatus: 204,
};

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    }
})


handlePollSocket(io);


app.use(cookieParser());
app.use(cors(
    corsOptions
))
app.use(express.json())
app.get("/ping", (_req, res) => {
    res.json({ message: "pong" })
})

app.use("/api/v1/poll", pollRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/vote", voteRouter);

await connectDB();
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})