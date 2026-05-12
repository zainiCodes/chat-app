import z from "zod"

export const userSchema = z.object({
    name: z.string().min(2, "Name is too short").optional(),
    username: z.string().min(3, "Username is too short").optional(),
    email: z.string().email("Invalid email").optional(),
    bio: z.string().min(5, "Bio is too short").optional(),
    image: z.any().optional(),
})
