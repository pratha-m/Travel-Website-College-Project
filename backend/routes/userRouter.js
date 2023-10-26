import express from "express";
import {getUserProfile, createUser, loginUser,updateUserProfile, checkOtp, changePassword ,userExists} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { sendEmail } from "../features/sendEmail.js";

const userRouter=express.Router();

userRouter.post("/create",createUser);

userRouter.post("/login",loginUser);

userRouter.get("/profile",isAuthenticated,getUserProfile);

userRouter.put("/profile",isAuthenticated,updateUserProfile);

userRouter.post("/sendemail",sendEmail);

userRouter.post("/exists",userExists);

userRouter.post("/checkotp",checkOtp);

userRouter.put("/changepassword",changePassword);

export default userRouter;