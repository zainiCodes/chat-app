import { auth } from "@chat-app/auth"
import { createPrismaClient } from "@chat-app/db"
import { type Request, type Response } from "express"
export async function AllRequests(req: Request, res: Response) {
    try {
        const prisma = createPrismaClient()
        const session = await auth.api.getSession({
            headers: req.headers
        })
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }
        const friendRequests = await prisma.friendship.findMany({
            where: {
                receiver: {
                    id: session.user.id
                },
                status: "PENDING"
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        username: true,
                    }
                }
            }
        })
        return res.status(200).json({
            message: "Friend requests fetched successfully",
            friendRequests
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}