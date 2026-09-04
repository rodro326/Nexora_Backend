import { z } from "zod";

export const createWithdrawalValidationSchema = z.object({
  amount: z
    .number()
    .positive("Withdrawal amount must be greater than 0"),

  paymentMethod: z.enum(["bank", "mobile_banking"]),

  accountNumber: z
    .string()
    .min(5, "Account number is required")
    .max(50, "Account number cannot exceed 50 characters"),

  note: z
    .string()
    .max(500, "Note cannot exceed 500 characters")
    .optional(),
});

export const updateWithdrawalStatusValidationSchema =
  z.object({
    status: z.enum([
      "pending",
      "approved",
      "rejected",
      "processed",
    ]),
  });