import streamifier from "streamifier"
import cloudinary from "@/lib/cloudinary"

export function uploadToCloudinary(buffer: Buffer) {
    return new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "chat-app",
            },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        )

        streamifier.createReadStream(buffer).pipe(stream)
    })
}