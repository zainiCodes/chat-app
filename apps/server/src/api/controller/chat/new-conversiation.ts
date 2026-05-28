import { type Request, type Response } from "express";
import { createPrismaClient } from "@chat-app/db";
import { auth } from "@chat-app/auth";

export async function newConversation(req: Request, res: Response) {
    try {
        const { id }: { id: string } = req.body;
        const prisma = createPrismaClient();
        console.log("Friend ID:", id);

        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!id) {
            return res.status(400).json({
                message: "cannot procceed without user id"
            });
        }

        await prisma.conversation.create({
            data: {
                type: "DIRECT",
                participants: {
                    create: [
                        {
                            userId: id
                        },
                        {
                            userId: session.user.id
                        }
                    ]
                }
            }
        });

        return res.status(200).json({
            message: "Conversation created!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }
}