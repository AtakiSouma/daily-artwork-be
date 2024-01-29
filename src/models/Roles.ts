import mongoose, { Schema } from "mongoose";
import { StringLiteral } from "typescript";

 export interface IRoles {
  title: string;
  slug: string;
  description: string;
  status: boolean;
}

const RoleSchema = new Schema<IRoles>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Roles = mongoose.model<IRoles>("Roles", RoleSchema);
