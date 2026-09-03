import { z } from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
});