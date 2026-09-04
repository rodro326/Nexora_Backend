import { z } from "zod";

export const createAddressValidationSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(5).max(20),
  address: z.string().min(5).max(300),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(3).max(20),
  isDefault: z.boolean().optional(),
});

export const updateAddressValidationSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  phone: z.string().min(5).max(20).optional(),
  address: z.string().min(5).max(300).optional(),
  city: z.string().min(2).max(100).optional(),
  postalCode: z.string().min(3).max(20).optional(),
  isDefault: z.boolean().optional(),
});