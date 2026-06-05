import { Router } from "express"
import { chatList } from "@/api/controller/chat/getChatList"
import { newConversation } from "@/api/controller/chat/new-conversiation"
import { getMessage } from "@/api/controller/chat/getMessages"
export const Conversation: Router = Router()

Conversation.get("/chat-list", chatList)
Conversation.post("/new-conversation", newConversation)
Conversation.get("/get-messages/:conversationId", getMessage)
