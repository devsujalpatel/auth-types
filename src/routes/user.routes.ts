import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.ts";

const userRouter = Router();

// userRouter.get("/"); // return current user

userRouter.post("/signup", registerUser); // create new user

// userRouter.post("/login"); // Login User

export default userRouter;
