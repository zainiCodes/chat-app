import { type Request, type Response } from "express"
import prisma from "@chat-app/db"
import { auth } from "@chat-app/auth"
import { userSchema } from "@/api/validators/user-schema"
import { uploadToCloudinary } from "@/api/services/uploadToCloudinaryFn"

export async function updateUser(req: Request, res: Response) {
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
        console.log(req.body)
        console.log(req.file)

        // ✅ Validate body with Zod
        const parsedData = userSchema.safeParse(req.body)

        if (!parsedData.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsedData.error.flatten(),
            })
        }

        const data = parsedData.data
        let imageUrl: string | undefined
        try {
            if (req.file) {
                const uploadedImage = await uploadToCloudinary(
                    req.file.buffer
                )

                imageUrl = uploadedImage.secure_url
            }

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Failed to upload image.",
            })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...data,
                image: imageUrl,
            },
        })


        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}