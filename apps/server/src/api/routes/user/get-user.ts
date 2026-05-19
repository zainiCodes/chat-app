import { Router } from "express"
import { getUser } from "@/api/controller/user/get-user"
import { updateUser } from "@/api/controller/user/set-user"
import { getAllUsers } from "@/api/controller/user/get-all-users"

export const userRouter: Router = Router()

userRouter.get("/getUser", getUser)
userRouter.post("/setUser", updateUser)
userRouter.get("/getAllUsers", getAllUsers)
