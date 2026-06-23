import { createContext } from "react"

export const ChatContext = createContext<{
    id: string,
    conversationId: string
} | undefined>(undefined)
