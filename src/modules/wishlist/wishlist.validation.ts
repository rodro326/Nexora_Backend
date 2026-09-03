import { z } from "zod";

export const addToWishlistValidationSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

export const removeFromWishlistValidationSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});