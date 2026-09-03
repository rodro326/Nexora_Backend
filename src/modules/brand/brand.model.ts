import { Schema, model } from "mongoose";

export interface IBrand {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      minlength: [2, "Brand name must be at least 2 characters"],
      maxlength: [100, "Brand name cannot exceed 100 characters"],
      unique: true,
    },

    slug: {
      type: String,
      required: [true, "Brand slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    logo: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = model<IBrand>("Brand", brandSchema);

export default Brand;