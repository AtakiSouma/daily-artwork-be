import { NextFunction, Request, Response } from "express";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import userServices from "../services/user.services";
import { sendSuccessResponse } from "../constants/successResponse";

const userController = {
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      if (!username || !password || !confirmPassword || !email) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
      const user = await userServices.registerUser({
        email,
        password,
        confirmPassword,
        username,
      });
      if (user) sendSuccessResponse(res, HttpStatusCodes.OK, user);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },
};

export default userController;
