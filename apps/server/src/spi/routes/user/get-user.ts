import { Router } from "express"
import { getUser } from "@/spi/controller/user/get-user"
import { updateUser } from "@/spi/controller/user/set-user"

export const userRouter: Router = Router()

userRouter.get("/getUser", getUser)
userRouter.post("/setUser", updateUser)
