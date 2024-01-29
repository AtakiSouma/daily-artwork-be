import HttpStatusCodes from "../constants/HttpStatusCodes";
import { generateError } from "../libs/handlers/errorsHandlers";
import { Request, Response, response } from "express";
import { Users } from "../models/Users";
import mongoose from "mongoose";
import { IRoles, loginInput } from "../constants/data";
import jwtServices from "./jwtServices";
import { TokenClass } from "typescript";
import { Tokens } from "../models/Token";
import bcryptModule from "../util/bcryptModule";

export interface tokenGenerate {
  id: string;
  email?: string;
  username?: string;
  avatar: string;
  phoneNumber?: string;
  gender?: boolean;
  role: mongoose.Types.ObjectId | IRoles;
}
class AuthService {
  private generateResponse(
    input: tokenGenerate,
    accessToken: string,
    refreshToken: string
  ) {
    if (!input.id || !accessToken || !input.email) {
      throw generateError("Invalid data", HttpStatusCodes.CONFLICT);
    }
    return {
      user: input,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private setRefreshToken(res: Response, refreshToken: string, uid: string) {
    res.cookie("refresh_token", refreshToken, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("uid", uid, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  public async newToken(id: string, res: Response) {
    const user = await Users.findOne({
      _id: id,
    });
    if (!user) {
      throw generateError(
        "You are not authenticated!",
        HttpStatusCodes.UNAUTHORIZED
      );
    }
    const tokenGenerate: tokenGenerate = {
      id: user.id,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber || undefined,
      gender: user.gender || undefined,
      avatar:
        user.avatar ||
        "https://cdn.donmai.us/original/fe/90/fe90c2ad3c46efd002abe86229bcdc37.png",
      role: user.role,
    };
    const { accessToken, refreshToken } =
      jwtServices.generatePairToken(tokenGenerate);
    this.setRefreshToken(res, refreshToken, user.id);
    this.setRefreshTokenInDB(user.id, refreshToken);

    return this.generateResponse(tokenGenerate, accessToken, refreshToken);
  }

  public async login({ email, password }: loginInput, res: Response) {
    const user = await Users.findOne({ email: email });
    if (!user || !user.password) {
      throw generateError("User not found", HttpStatusCodes.UNAUTHORIZED);
    }

    const compare = await bcryptModule.compare(password, user.password);
    if (compare) {
      const tokenGenerate: tokenGenerate = {
        id: user.id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber || undefined,
        gender: user.gender || undefined,
        avatar:
          user.avatar ||
          "https://cdn.donmai.us/original/fe/90/fe90c2ad3c46efd002abe86229bcdc37.png",
        role: user.role,
      };
      const { accessToken, refreshToken } =
        jwtServices.generatePairToken(tokenGenerate);
      this.setRefreshToken(res, refreshToken, user.id);
      this.setRefreshTokenInDB(user.id, refreshToken);
      return this.generateResponse(tokenGenerate, accessToken, refreshToken);
    } else {
      throw generateError("Password not correct", HttpStatusCodes.UNAUTHORIZED);
    }
  }
  public async logout(res: Response) {
    try {
      res.clearCookie("refresh_token");
      res.clearCookie("uid")
      return "Logged out successfully";
    } catch (error) {
      throw generateError(
        "Cannot log out",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  private async setRefreshTokenInDB(userId: string, refreshToken: string) {
    try {
      const user = await Users.findOne({ _id: userId });
      if (!user) {
        throw generateError(
          "User is not logged in",
          HttpStatusCodes.UNAUTHORIZED
        );
      }
      const existingToken = await Tokens.findOne({ user: userId });
      if (existingToken) {
        existingToken.refresh_token = refreshToken;
        await existingToken.save();
      } else {
        await Tokens.create({
          user: userId,
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      throw generateError(
        "Error saving refresh token",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new AuthService();
