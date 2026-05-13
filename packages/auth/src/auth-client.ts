import { createAuthClient } from "better-auth/client"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@chat-app/auth"

export const authClient = createAuthClient({
    baseURL: process.env.VITE_API_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
}) 