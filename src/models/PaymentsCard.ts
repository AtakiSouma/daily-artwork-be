import mongoose, { Schema, mongo } from "mongoose";
import { IUsers } from "./Users";

export interface IPaymentCard {
  cardNumber: number;
  expiredDate: Date;
  customer_id: mongoose.Types.ObjectId | IUsers;
  status: boolean;
}
const PaymentCardSchema = new Schema<IPaymentCard>(
  {
    cardNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    expiredDate: {
      type: Date,
      required: true,
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

export const PaymentCards = mongoose.model<IPaymentCard>("PaymentCards", PaymentCardSchema);
