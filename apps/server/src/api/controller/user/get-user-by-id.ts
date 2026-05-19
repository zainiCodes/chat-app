
import { type Request, type Response } from "express"
import { createPrismaClient } from "@chat-app/db"

export async function getUserById(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({
                message: "User id is required",
            })
        }
        const prisma = createPrismaClient()
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        const friendships = await prisma.friendship.findMany({
            where: {
                status: "ACCEPTED",
                OR: [
                    { requesterId: id },
                    { receiverId: id },
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