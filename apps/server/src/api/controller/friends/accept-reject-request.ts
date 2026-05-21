import { auth } from "@chat-app/auth"
import { createPrismaClient } from "@chat-app/db"
import { type Request, type Response } from "express"
export async function AcceptRejectRequest(req: Request, res: Response) {
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

        const { requestId, status }: { requestId: string, status: string } = req.body
        if (status == "ACCEPTED") {
            const Friendship = await prisma.friendship.update({
                where: {
                    id: requestId,
                    receiver: {
                        id: session.user.id
                    }
                },
                data: {
                    status: "ACCEPTED"
                }
            })
            await prisma.notification.deleteMany({
                where: {
                    receiverId: session.user.id,
                    type: "FRIEND_REQUEST",
                    OR: [
                        { friendshipId: requestId },
                        { senderId: Friendship.requesterId }
                    ]
                }
            })
            return res.status(200).json({
                message: "Friend request accepted successfully",
            })
        }
        else {
            const deletedFriendship = await prisma.friendship.delete({
                where: {
                    id: requestId,
                    receiverId: session.user.id
                }
            })
            await prisma.notification.deleteMany({
                where: {
                    receiverId: session.user.id,
                    type: "FRIEND_REQUEST",
                    OR: [
                        { friendshipId: requestId },
                        { senderId: deletedFriendship.requesterId }
                    ]
                }
            })
            return res.status(200).json({
                message: "Friend request rejected successfully",
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}