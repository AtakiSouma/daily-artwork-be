import express, { Request, Response, Application } from "express";
import authController from "../../controllers/auth.controller";
import { auth } from "firebase-admin";

const router = express.Router();
router.post("/login", authController.login);
router.get("/logout", authController.logout);

export default router;
