import { z } from "zod";

export const createCouponValidationSchema = z
  .object({
    code: z
      .string()
      .min(3, "Coupon code must be at least 3 characters")
      .max(30, "Coupon code cannot exceed 30 characters"),

    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    discountType: z.enum(["percentage", "fixed"]),

    discountValue: z
      .number()
      .positive("Discount value must be greater than 0"),

    minOrderAmount: z
      .number()
      .min(0, "Minimum order amount cannot be negative")
      .optional(),

    maxDiscountAmount: z
      .number()
      .positive("Maximum discount amount must be greater than 0")
      .optional(),

    usageLimit: z
      .number()
      .int("Usage limit must be an integer")
      .positive("Usage limit must be greater than 0")
      .optional(),

    startDate: z.string().datetime().optional(),

    expiryDate: z.string().datetime("Invalid expiry date"),

    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.discountType === "percentage") {
        return data.discountValue <= 100;
      }

      return true;
    },
    {
      message: "Percentage discount cannot exceed 100",
      path: ["discountValue"],
    }
  )
  .refine(
    (data) => {
      if (data.startDate && data.expiryDate) {
        return new Date(data.expiryDate) > new Date(data.startDate);
      }

      return true;
    },
    {
      message: "Expiry date must be after start date",
      path: ["expiryDate"],
    }
  );

export const updateCouponValidationSchema = z
  .object({
    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    discountType: z
      .enum(["percentage", "fixed"])
      .optional(),

    discountValue: z
      .number()
      .positive("Discount value must be greater than 0")
      .optional(),

    minOrderAmount: z
      .number()
      .min(0, "Minimum order amount cannot be negative")
      .optional(),

    maxDiscountAmount: z
      .number()
      .positive("Maximum discount amount must be greater than 0")
      .optional(),

    usageLimit: z
      .number()
      .int("Usage limit must be an integer")
      .positive("Usage limit must be greater than 0")
      .optional(),

    startDate: z.string().datetime().optional(),

    expiryDate: z.string().datetime().optional(),

    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (
        data.discountType === "percentage" &&
        data.discountValue !== undefined
      ) {
        return data.discountValue <= 100;
      }

      return true;
    },
    {
      message: "Percentage discount cannot exceed 100",
      path: ["discountValue"],
    }
  );

export const applyCouponValidationSchema = z.object({
  code: z
    .string()
    .min(3, "Coupon code is required")
    .max(30, "Coupon code cannot exceed 30 characters"),

  orderAmount: z
    .number()
    .positive("Order amount must be greater than 0"),
});