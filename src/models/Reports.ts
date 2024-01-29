import mongoose, { Schema, mongo } from "mongoose";
import { IPosts } from "./Posts";
import { IAlbums } from "./Albums";
import { IUsers } from "./Users";

export interface IReports {
  post_id: mongoose.Types.ObjectId | IPosts;
  customer_id: mongoose.Types.ObjectId | IUsers;
  description: string;
}
const ReportSchema = new Schema<IReports>(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Posts",
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

export const Reports = mongoose.model<IReports>("Reports", ReportSchema);
