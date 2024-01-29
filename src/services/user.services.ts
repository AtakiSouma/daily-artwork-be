import { HttpStatusCode } from "axios";
import { IUsersParams } from "../constants/data";
import { generateError } from "../libs/handlers/errorsHandlers";
import { Users } from "../models/Users";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import bcryptModule from "../util/bcryptModule";
import { UUID } from "mongodb";

class userServices {
  public async registerUser({
    username,
    email,
    password,
    confirmPassword,
  }: IUsersParams) {
    const userExisting = await Users.findOne({
      email: email,
    });
    const DuplicatedName = await Users.findOne({
      username: username,
    });
    if (userExisting) {
      throw generateError("User already exists", HttpStatusCodes.CONFLICT);
    }
    if (DuplicatedName) {
      throw generateError("User Name already exists", HttpStatusCodes.CONFLICT);
    }

    if (password !== confirmPassword) {
      throw generateError(
        "Password is not matching!",
        HttpStatusCodes.CONFLICT
      );
    }
    const pwd = await bcryptModule.getHash(password);
    const new_user = await Users.create({
      email: email,
      password: pwd,
      username: username,
      avatar: null,
      role: "65b713c0edb2c9e7fb816137", // default for customer
      phoneNumber: null,
    });
    return new_user;
  }


  
}

export default new userServices();
