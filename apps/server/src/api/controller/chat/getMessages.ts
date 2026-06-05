import { type Request, type Response } from "express"
import { createPrismaClient } from "@chat-app/db"
import { auth } from "@chat-app/auth"


export async function getMessage(req: Request, res: Response) {
    try {
        const session = await auth.api.getSession({ headers: req.headers })
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }
        const prisma = createPrismaClient()
        const conversationId = req.params.conversationId as string
        if (!conversationId) {
            return res.status(401).json({
                message: "Missing Conversation ID or User ID",
            })
        }
        const participant =
            await prisma.conversationParticipant.findUnique({
                where: {
                    conversationId_userId: {
                        conversationId,
                        userId: session.user.id,
                    },
                },
            })
        if (!participant) {
            return res.status(404).json({
                message: "User is not a participant in this conversation",
            });
        }

        const allMessages = await prisma.message.findMany({
            where: {
                conversationId,
                isDeleted: false,
            },
            orderBy: {
                seq: "desc",
            },
            take: 50,
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        })

        return res.status(200).json({
            message: "Messages fetched success!",
            allMessages
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong."
        })
    }
}