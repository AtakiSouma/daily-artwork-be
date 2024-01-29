import mongoose, { Schema, mongo } from "mongoose";
import { IUsers } from "./Users";
import { IPosts } from "./Posts";

export interface IImages {
  imageName: string;
  imageURL : string;
  isDisplay: boolean;
  status: boolean;
  post_id : mongoose.Types.ObjectId | IPosts ;
}
const ImagesSchema = new Schema<IImages>(
  {
    imageName: {
      type: String,
      required: true,
      unique: true,
    },
    imageURL: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDisplay: {
      type: Boolean,
      default: false,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Posts",
    },
  },
  {
    timestamps: true,
  }
);

export const Images = mongoose.model<IImages>("Images", ImagesSchema);
