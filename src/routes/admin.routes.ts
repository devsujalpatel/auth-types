import { Router } from "express";
import { getAllUsers } from "../controllers/admin.controllers.ts";
import {
  ensureAuthenticated,
  restrictToRole,
} from "../middlewares/auth.middleware.ts";

const adminRouter = Router();

const adminRestricMiddleware = restrictToRole("ADMIN");

adminRouter.use(ensureAuthenticated);
adminRouter.use(adminRestricMiddleware);

adminRouter.get("/users", getAllUsers);

export default adminRouter;
