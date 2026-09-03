import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  role: z.enum(["customer", "vendor"]).optional(),
});

export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});