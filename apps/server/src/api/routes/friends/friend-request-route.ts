import { Router } from "express"
import { FriendshipRequest } from "@/api/controller/friends/friendship-request"

import { AcceptRejectRequest } from "@/api/controller/friends/accept-reject-request"
export const friendRequestRouter: Router = Router()

friendRequestRouter.post("/friendshipRequest", FriendshipRequest)
friendRequestRouter.post("/acceptRejectRequest", AcceptRejectRequest)