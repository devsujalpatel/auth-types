import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.ts";
import adminRouter from "./routes/admin.routes.ts";
import { authMiddleware } from "./middlewares/auth.middleware.ts";

dotenv.config();
const app = express();

const port = process.env.PORT! ?? 8080;

app.use(express.json());

// Middleware
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
