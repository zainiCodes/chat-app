import { auth } from "@chat-app/auth";
import { env } from "@chat-app/env/server";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";
import { userRouter } from "./api/routes/user/get-user";
import { friendRouter } from "./api/routes/friends/friends-list-route";
import { friendRequestRouter } from "./api/routes/friends/friend-request-route";
import { notificationRouter } from "./api/routes/notifications/notification-route";
import { Conversiation } from "./api/routes/chats/conversiation";

const app: Express = express();
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

// ONLY THIS (important)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.get("/", (_req, res) => {
    res.status(200).send("OK");
});
app.use("/api", userRouter)
app.use("/api", friendRouter)
app.use("/api", friendRequestRouter)
app.use("/api", notificationRouter)
app.use("/api", Conversiation)




export default app;