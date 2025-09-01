import { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controllers.ts";
import { ensureAuthenticated } from "../middlewares/auth.middleware.ts";

const userRouter = Router();

userRouter.get("/", ensureAuthenticated, currentUser); // return current user

userRouter.post("/signup", registerUser); // create new user

userRouter.post("/login", loginUser); // Login User

userRouter.patch("/update", ensureAuthenticated, updateUser);

export default userRouter;
