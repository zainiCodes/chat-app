import { type Request, type Response } from "express"
import prisma from "@chat-app/db"
import { auth } from "@chat-app/auth"

export async function getUser(req: Request, res: Response) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        })
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }

        const userId = session.user.id


        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user,
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error",
        })
    }
}