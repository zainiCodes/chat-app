import { Router } from "express"
import { FriendshipRequest } from "@/api/controller/friends/friendship-request"
import { AllRequests } from "@/api/controller/friends/all-requests"
import { AcceptRejectRequest } from "@/api/controller/friends/accept-reject-request"
export const friendRequestRouter: Router = Router()

friendRequestRouter.post("/friendshipRequest", FriendshipRequest)
friendRequestRouter.get("/allRequests", AllRequests)
friendRequestRouter.post("/acceptRejectRequest", AcceptRejectRequest)