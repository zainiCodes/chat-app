import { auth } from "@chat-app/auth"
import { type Request, type Response } from "express"
import { createPrismaClient } from '@chat-app/db'
export async function getFriendsList(req: Request, res: Response) {
    try {
        const prisma = createPrismaClient()
        const session = await auth.api.getSession({
            headers: req.headers,
        })
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }

        const userId = session.user.id

        const friendships = await prisma.friendship.findMany({
            where: {
                status: "ACCEPTED",
                OR: [
                    { requesterId: userId },
                    { receiverId: userId },
                ],
            },
            include: {
                requester: true,
                receiver: true,
            },
        });


        return res.status(200).json({
            message: "User fetched successfully",
            friendships
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error",
        })
    }
}