import { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controllers.ts";
import { sessionMiddleware } from "../middlewares/session.middleware.ts";

const userRouter = Router();

userRouter.get("/", sessionMiddleware, currentUser); // return current user

userRouter.post("/signup", registerUser); // create new user

userRouter.post("/login", loginUser); // Login User

userRouter.patch("/update", sessionMiddleware, updateUser);

export default userRouter;
