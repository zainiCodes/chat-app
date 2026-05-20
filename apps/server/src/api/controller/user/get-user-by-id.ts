import { type Request, type Response } from "express"
import { createPrismaClient } from "@chat-app/db"
import { auth } from "@chat-app/auth"

export async function getUserById(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({
                message: "User id is required",
            })
        }
        
        const session = await auth.api.getSession({
            headers: req.headers
        })
        
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }

        const prisma = createPrismaClient()
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        const friendships = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId: id, receiverId: session.user.id },
                    { receiverId: id, requesterId: session.user.id },
                ],
            },
            include: {
                requester: true,
                receiver: true,
            },
        });

        return res.status(200).json({
            message: "User fetched successfully",
            user, friendships
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error",
        })
    }
}