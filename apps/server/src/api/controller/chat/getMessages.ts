import { type Request, type Response } from "express"
import { createPrismaClient } from "@chat-app/db"
import { auth } from "@chat-app/auth"


export async function getMessage(req: Request, res: Response) {
    try {
        const session = await auth.api.getSession({ headers: req.headers })
        if (!session) {
            return res.status(401).json({
                message: "User not logged in",
            })
        }
        const prisma = createPrismaClient()
        const conversationId = req.params.conversationId as string
        const cursor = req.query.cursor as number | undefined;
        if (!conversationId) {
            return res.status(401).json({
                message: "Missing Conversation ID or User ID",
            })
        }
        const participant =
            await prisma.conversationParticipant.findUnique({
                where: {
                    conversationId_userId: {
                        conversationId,
                        userId: session.user.id,
                    },
                },
            })
        if (!participant) {
            return res.status(404).json({
                message: "User is not a participant in this conversation",
            });
        }
        const PAGE_SIZE = 30;

        const allMessages = await prisma.message.findMany({
            where: {
                conversationId,
                isDeleted: false,
            },
            orderBy: {
                seq: "desc",
            },
            take: PAGE_SIZE + 1,
            ...(cursor && {
                cursor: {
                    seq: BigInt(cursor),
                },
                skip: 1,
            }),
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        // const allMessages = await prisma.message.findMany({
        //     where: {
        //         conversationId,
        //         isDeleted: false,
        //     },
        //     orderBy: {
        //         seq: "asc",
        //     },
        //     take: 50,
        //     include: {
        //         sender: {
        //             select: {
        //                 id: true,
        //                 name: true,
        //                 image: true,
        //             },
        //         },
        //     },
        // })
        const hasMore = allMessages.length === PAGE_SIZE + 1;
        // Cursor is the seq of the LAST item we're actually sending (index PAGE_SIZE-1).
        // The next fetch will use skip:1 past that cursor, so it starts at PAGE_SIZE+1 onward.
        const nextCursor = hasMore
            ? allMessages[PAGE_SIZE - 1]?.seq.toString()
            : null;

        // Trim the extra sentinel before sending
        const messagesToSend = hasMore ? allMessages.slice(0, PAGE_SIZE) : allMessages;

        const serializedMessages = JSON.parse(
            JSON.stringify(
                messagesToSend,
                (_, value) =>
                    typeof value === "bigint"
                        ? Number(value)
                        : value
            )
        );

        return res.status(200).json({
            message: "Messages fetched successfully",
            messages: serializedMessages.reverse(),
            nextCursor,
            hasMore,
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong."
        })
    }
}