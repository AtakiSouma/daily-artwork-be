import mongoose, { Schema, mongo } from "mongoose";
import { IUsers } from "./Users";
import { IPosts } from "./Posts";
import { required } from "joi";

export interface IOrders {
  customer_id: mongoose.Types.ObjectId | IUsers;
  priceFixed: number;
  title: string;
  description: string;
  creator_id: mongoose.Types.ObjectId | IUsers;
  finished_At: Date;
  status_order: string;
  post_id: mongoose.Types.ObjectId | IPosts;
  status: boolean;
}
const OrdersSchema = new Schema<IOrders>(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    priceFixed: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },

    status: {
      type: Boolean,
      default: true,
    },
    finished_At: {
      type: Date,
      default: Date.now,
    },
    status_order: {
      type: String,
      enum: ["Completed", "Processing", "Finished", "Not Available"],
      required: true,
      default: "Not Available",
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

export const Orders = mongoose.model<IOrders>("Orders", OrdersSchema);


