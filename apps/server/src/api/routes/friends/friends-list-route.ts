import { Router } from "express"
import { getFriendsList } from "@/api/controller/friends/get-friends-list"

export const friendRouter: Router = Router()

friendRouter.get("/getFriendsList", getFriendsList)