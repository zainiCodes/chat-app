import { type Request, type Response } from "express"
import prisma from "@chat-app/db"

export async function getUser(req: Request, res: Response) {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}