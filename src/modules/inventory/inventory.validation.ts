import { z } from "zod";

export const createInventoryValidationSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  lowStockThreshold: z.number().int().min(0).optional(),
});

export const updateInventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, "Quantity cannot be negative").optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
});