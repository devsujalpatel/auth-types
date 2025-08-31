import { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.ts";

const userRouter = Router();

userRouter.get("/", currentUser); // return current user

userRouter.post("/signup", registerUser); // create new user

userRouter.post("/login", loginUser); // Login User

export default userRouter;
