import mongoose, { Schema, mongo } from "mongoose";
import { IUsers } from "./Users";

export interface IAlbums {
  title: string;
  slug: string;
  postCount: number | 0;
  customer_id: mongoose.Types.ObjectId | IUsers;
  status: boolean;
}
const AlbumsSchema = new Schema<IAlbums>(
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
    postCount: {
      type: Number,
      default: 0,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export const Albums = mongoose.model<IAlbums>("Albums", AlbumsSchema);
