import mongoose, { Schema, mongo } from "mongoose";
import { IPosts } from "./Posts";
import { IAlbums } from "./Albums";

export interface IPostInAlbum {
  post_id: mongoose.Types.ObjectId | IPosts;
  album_id: mongoose.Types.ObjectId | IAlbums;
}
const PostInAlbumSchema = new Schema<IPostInAlbum>(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Posts",
    },
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Albums",
    },
  },
  {
    timestamps: true,
  }
);

export const PostInAlbums = mongoose.model<IPostInAlbum>(
  "PostInAlbums",
  PostInAlbumSchema
);
