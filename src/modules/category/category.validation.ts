import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
});

export const updateCategoryValidationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  slug: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});