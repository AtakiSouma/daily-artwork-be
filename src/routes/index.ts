import express from "express";
import roleRouter from "./api/roleApi";
import userRouter from "./api/userApi";
import authRouter from "./api/authApi";
export function route(app: express.Express) {
  app.use("/api/roles", roleRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
}
