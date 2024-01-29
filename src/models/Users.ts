import joi from "joi";
import mongoose, { Schema } from "mongoose";
import { IRoles } from "./Roles";

export interface IUsers {
  username: string;
  email: string;
  password: string;
  avatar?: string | null;
  phoneNumber?: string | null;
  gender?: boolean; // true: Male || false : FEmale
  role: mongoose.Types.ObjectId | IRoles;
  status: boolean;
}

export const UserSchemaValidate = joi.object({
  username: joi.string().required(),
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "yahoo"] } }),
  avatar: joi.string().required(),
  password: joi.string().required().min(5).max(20),
});

const UsersSchema = new Schema<IUsers>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "https://cdn.donmai.us/original/fe/90/fe90c2ad3c46efd002abe86229bcdc37.png",
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    gender: {
      type: Boolean,
      default: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model<IUsers>("Users", UsersSchema);
