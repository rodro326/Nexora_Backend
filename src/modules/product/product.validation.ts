import { z } from "zod";

export const createProductValidationSchema = z.object({
  name: z.string().min(2).max(150),

  description: z.string().min(10),

  price: z.number().min(0),

  stock: z.number().int().min(0),

  images: z.array(z.string()).optional(),

  category: z.string().min(1),

  brand: z.string().min(1),
});

export const updateProductValidationSchema = z.object({
  name: z.string().min(2).max(150).optional(),

  description: z.string().min(10).optional(),

  price: z.number().min(0).optional(),

  stock: z.number().int().min(0).optional(),

  images: z.array(z.string()).optional(),

  category: z.string().min(1).optional(),

  brand: z.string().min(1).optional(),

  isActive: z.boolean().optional(),
});