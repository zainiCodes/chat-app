import { Server } from "socket.io";

export let io: Server;

export const intializeServer = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3001",
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
