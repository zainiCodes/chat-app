import { auth } from "@chat-app/auth"
import { type Request, type Response } from "express"
import { createPrismaClient } from '@chat-app/db'
export async function FriendshipRequest(req: Request, res: Response) {
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
        const { friendId }: { friendId: string } = req.body
        if (!friendId) {
            return res.status(401).json({
                message: "Friend Id not found."
            })
        }
        const friendRequest = await prisma.friendship.create({
            data: {
                requester: {
                    connect: {
                        id: session.user.id,
                    }
                },
                receiver: {
                    connect: {
                        id: friendId
                    }
                },
                status: "PENDING"
            },
            include: {
                requester: true
            }
        })
        await prisma.notification.create({
            data: {
                type: "FRIEND_REQUEST",
                title: "Friend Request",
                body: `${friendRequest.requester.name} sent you a friend request.`,
                receiverId: friendId,
                senderId: session.user.id,
                friendshipId: friendRequest.id
            }
        })

        return res.status(200).json({
            message: "Friend request sent successfully",
            friendRequest
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}