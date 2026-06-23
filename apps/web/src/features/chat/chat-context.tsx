import { createContext, Dispatch, SetStateAction } from "react"

export type ChatContextType = {
    id: string;
    conversationId: string;
    setSharedData: Dispatch<SetStateAction<{ id: string; conversationId: string }>>;
}

export const ChatContext = createContext<ChatContextType>({
    id: "",
    conversationId: "",
    setSharedData: () => {}
})