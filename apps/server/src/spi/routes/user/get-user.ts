import { Router } from "express"
import { getUser } from "@/spi/controller/user/get-user"

export const userRouter: Router = Router()

userRouter.get("/getUser", getUser)
