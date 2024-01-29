
import { NextFunction, Request, Response } from "express";
import jwtServices from "../services/jwtServices";
import { generateError } from "../libs/handlers/errorsHandlers";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { JwtPayload } from "jsonwebtoken";
import authServices from "../services/auth.services";

const middlewareController = {


    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        try {
          const token = req.header("Authorization");
          if (token) {
            const accessToken = token.split(" ")[1];
            const payload = jwtServices.verifyToken(accessToken) as JwtPayload;
            if (payload) {
              res.locals.payload = payload;
              next();
            }
          } else {
            throw generateError(
              "You are not authenticated",
              HttpStatusCodes.FORBIDDEN
            );
          }
        } catch (error) {
          throw error;
        }
      },


      requestRefresh: (req: Request, res: Response, next: NextFunction) => {
        try {
          const token = req.cookies.refresh_token;
          const uid  = req.cookies.uid
          console.log("token from cookie: ", token);
          const tokenisExpired = jwtServices.isTokenExpired(token);
          if (tokenisExpired) {
            authServices.newToken(uid , token);
            next();
          } else {
            next();
          }
        } catch (error) {
          throw error
        }
      },

}
export default middlewareController;
