import { type Request, type Response } from "express"
import { createPrismaClient } from "@chat-app/db"
import { auth } from "@chat-app/auth"


export async function chatList(req: Request, res: Response) {
    try {
        const session = await auth.api.getSession({ headers: req.headers })
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }
        const prisma = createPrismaClient()

        const AllConversations = await prisma.conversationParticipant.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                conversation: {
                    include: {
                        messages: {
                            orderBy: {
                                seq: 'desc'
                            },
                            take: 1
                        },
                        participants: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        username: true,
                                        name: true,
                                        image: true,
                                        isOnline: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).json({
            message: "Chat Listed Successfuly",
            AllConversations
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong."
        })
    }



}
