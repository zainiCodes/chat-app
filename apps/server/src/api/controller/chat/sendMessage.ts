import { type Request, type Response } from "express";
import { createPrismaClient } from "@chat-app/db";
import { auth } from "@chat-app/auth";

export async function sendMessage(req: Request, res: Response) {
    try {
        const { conversationId, senderId, content }: { conversationId: string, content: string, senderId: string } = req.body;
        const prisma = createPrismaClient();
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!conversationId || !content || !senderId) {
            return res.status(400).json({ message: "Data is missing" })
        }

        const message = await prisma.message.create({
            data: {
                type: "TEXT",
                content: content,
                conversationId: conversationId,
                senderId: senderId,
            }
        })

        await prisma.conversationParticipant.findMany({
            where: {
                userId: session.user.id,
                leftAt: null,
                OR: [
                    { conversation: { type: "GROUP" } },
                    {
                        conversation: {
                            type: "DIRECT",
                            messages: {
                                some: {}
                            }
                        }
                    },
                    {
                        conversation: { type: "DIRECT" },
                        role: "ADMIN"
                    }
                ]
            }
        })


        const participants = await prisma.conversationParticipant.findMany({
            where: {
                conversationId: conversationId
            }
        })

        // All participants except the sender
        const receivers = participants.filter(p => p.userId !== senderId);

        const sender = await prisma.user.findFirst({
            where: { id: senderId }
        })

        // Create one notification per receiver
        await prisma.notification.createMany({
            data: receivers.map((receiver) => ({
                title: "New Message.",
                body: `${sender?.name} sent you a message.`,
                type: "MESSAGE",
                senderId: senderId,
                receiverId: receiver.userId,
                messageId: message.id,
            }))
        })

        return res.status(200).json({
            message: "Message Created Success!👍",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}