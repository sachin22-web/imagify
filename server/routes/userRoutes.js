import express from "express"

import {paymentRazorpay, registerUser, userCredits, verifyRazorpay} from "../controllers/userController.js"
import {loginUser} from "../controllers/userController.js"
import userAuth from "../middleware/auth.js"

const userRouter = express.Router()
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/credits",userAuth,userCredits)
userRouter.post("/pay-razor",userAuth,paymentRazorpay)
userRouter.post("/verify-razor",verifyRazorpay)

export default userRouter


// localhost:4000/api/user/register
// localhost:4000/api/user/login
// localhost:4000/api/user/credits
