import { z } from "zod";

export const createReviewValidationSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),

  orderId: z.string().min(1, "Order ID is required"),

  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(1000, "Comment cannot exceed 1000 characters"),
});

export const updateReviewValidationSchema = z.object({
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .optional(),

  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(1000, "Comment cannot exceed 1000 characters")
    .optional(),
});

export const updateReviewApprovalValidationSchema = z.object({
  isApproved: z.boolean(),
});