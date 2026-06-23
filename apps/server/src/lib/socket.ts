import { env } from "@chat-app/env/server";
import { Server } from "socket.io";

export let io: Server;

export const intializeServer = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: env.CORS_ORIGIN,
            credentials: true,
        },
    })
    io.on("connection", (socket) => {
        console.log("connected", socket.id)

        socket.on("join-conversation", (conversationId) => {
            socket.join(conversationId)
        })

        socket.on("disconnect", () => {
            console.log("disconnected")
        })
    })
}
