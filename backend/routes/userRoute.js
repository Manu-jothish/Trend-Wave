import express from "express"
import { loginUser,logoutUser,registerUser } from "../controllers/userController.js"

const userRoute = express.Router()

userRoute.post('/',loginUser)
userRoute.post('/register',registerUser)
userRoute.get('/logout',logoutUser)

export default userRoute 