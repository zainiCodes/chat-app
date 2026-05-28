import { Router } from "express"
import { chatList } from "@/api/controller/chat/getChatList"
export const ChatList: Router = Router()

ChatList.get("/chat-list", chatList)


