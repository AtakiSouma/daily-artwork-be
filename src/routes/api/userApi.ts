import express, { Request, Response, Application } from "express";
import userController from "../../controllers/user.controller";
const router = express.Router();
router.post("/register", userController.registerUser);

export default router;
