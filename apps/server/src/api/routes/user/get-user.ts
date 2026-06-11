import { Router } from "express"
import { getUser } from "@/api/controller/user/get-user"
import { updateUser } from "@/api/controller/user/set-user"
import { getAllUsers } from "@/api/controller/user/get-all-users"
import { getUserById } from "@/api/controller/user/get-user-by-id"
import { upload } from "@/api/middleware/upload"

export const userRouter: Router = Router()

userRouter.get("/getUser", getUser)
userRouter.post("/setUser", upload.single("image"), updateUser)
userRouter.get("/getAllUsers", getAllUsers)
userRouter.get("/getUserById/:id", getUserById)
