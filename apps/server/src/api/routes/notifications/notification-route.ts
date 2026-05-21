import { friendRequestNotification } from "@/api/controller/notification/get-friend-request-notification"
import { Router } from "express"


export const notificationRouter: Router = Router()

notificationRouter.get("/getFriendRequestNotification", friendRequestNotification)

