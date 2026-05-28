import { Router } from "express"
import { chatList } from "@/api/controller/chat/getChatList"
import { newConversiation } from "@/api/controller/chat/new-conversiation"
export const Conversiation: Router = Router()

Conversiation.get("/chat-list", chatList)
Conversiation.post("/new-conversiation", newConversiation)


