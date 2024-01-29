import mongoose, { Schema } from "mongoose";

export interface ITags {
  title: string;
  slug: string;
  description: string;
  status: boolean;
}
const TagsSchema = new Schema<ITags>(
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
  
  export const Tags = mongoose.model<ITags>("Tags",TagsSchema);
  