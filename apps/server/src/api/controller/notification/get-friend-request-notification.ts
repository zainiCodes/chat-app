import { auth } from "@chat-app/auth"
import { type Request, type Response } from "express"
import { createPrismaClient } from '@chat-app/db'
export async function friendRequestNotification(req: Request, res: Response) {
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

        const friendRequestNotification = await prisma.notification.findMany({
            where: {
                receiverId: session.user.id,
                type: "FRIEND_REQUEST"
            },
            include: {
                sender: true
            }
        })
        return res.status(200).json({
            message: "Friend request sent successfully",
            friendRequestNotification
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}