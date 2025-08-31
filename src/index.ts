import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.ts";

dotenv.config();
const app = express();

const port = process.env.PORT! ?? 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
