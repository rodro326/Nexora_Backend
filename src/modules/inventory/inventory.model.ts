import { Schema, model, Types } from "mongoose";

export interface IInventory {
  product: Types.ObjectId;
  vendor: Types.ObjectId;
  quantity: number;
  lowStockThreshold: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const inventorySchema = new Schema<IInventory>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
      unique: true,
    },

    vendor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      required: [true, "Low stock threshold is required"],
      min: [0, "Low stock threshold cannot be negative"],
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = model<IInventory>("Inventory", inventorySchema);

export default Inventory;