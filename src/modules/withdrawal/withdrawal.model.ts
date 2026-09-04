import { Schema, model, Types } from "mongoose";

export type WithdrawalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "processed";

export interface IWithdrawal {
  vendor: Types.ObjectId;
  amount: number;
  status: WithdrawalStatus;
  paymentMethod: "bank" | "mobile_banking";
  accountNumber: string;
  note?: string;
  processedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const withdrawalSchema = new Schema<IWithdrawal>(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor is required"],
    },

    amount: {
      type: Number,
      required: [true, "Withdrawal amount is required"],
      min: [1, "Withdrawal amount must be greater than 0"],
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "processed",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["bank", "mobile_banking"],
      required: [true, "Payment method is required"],
    },

    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      trim: true,
    },

    note: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Note cannot exceed 500 characters",
      ],
    },

    processedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Withdrawal = model<IWithdrawal>(
  "Withdrawal",
  withdrawalSchema
);

export default Withdrawal;