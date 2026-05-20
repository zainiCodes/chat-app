import { Router } from "express"
import { FriendshipRequest } from "@/api/controller/friends/friendship-request"

export const friendRequestRouter: Router = Router()

friendRequestRouter.post("/friendshipRequest", FriendshipRequest)