import joi from "joi";
import mongoose, { Schema } from "mongoose";
import { ITags } from "./Tags";
import { IUsers } from "./Users";

export interface IPosts {
  title: string;
  slug: string;
  description: string;
  status: boolean;
  postLikeCount: number | 0;
  reportCount: number | 0;
  tag: mongoose.Types.ObjectId | ITags;
  price: number | 0;
  creator_id: mongoose.Types.ObjectId | IUsers;
  isBought: boolean;
  rate?: number | null;
}

export const PostSchemaValidate = joi.object({
  title: joi.string().required().min(5).max(30),
  description: joi.string().required(),
  postLikeCount: joi.number().required(),
  reportCount: joi.number().required(),
  tag: joi.string().required(),
  price: joi.number().required().min(0),
  creator_id: joi.string().required(),
  rate: joi.number(),
});

const PostsSchema = new Schema<IPosts>(
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
      required: true,
    },
    postLikeCount: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tags",
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    isBought: {
      type: Boolean,
      default: false,
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model<IPosts>("Posts", PostsSchema);
