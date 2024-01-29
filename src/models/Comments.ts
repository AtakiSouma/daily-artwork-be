import mongoose, { Schema, mongo } from "mongoose";
import { IUsers } from "./Users";
import { IPosts } from "./Posts";

export interface IComments {
  comment_text: string;
  customer_id: mongoose.Types.ObjectId | IUsers;
  post_id: mongoose.Types.ObjectId | IPosts;
  replyToCommentId?: string | null;
  commentLikeCount: Number | null;
  status: boolean | true;
}
const CommentsSchema = new Schema<IComments>(
  {
    comment_text: {
      type: String,
      required: true,
    },
    replyToCommentId: {
        type: String,
        required: true,
      },
    status: {
      type: Boolean,
      default: true,
    },
    commentLikeCount: {
      type: Number,
      default: 0,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
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

export const Comments = mongoose.model<IComments>("Comments", CommentsSchema);
