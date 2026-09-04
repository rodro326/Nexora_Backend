import { z } from "zod";

export const createPaymentValidationSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),

  amount: z
    .number()
    .positive("Payment amount must be greater than 0"),

  paymentMethod: z.enum(["cod", "card", "online"]),

  transactionId: z.string().min(1).optional(),
});

export const updatePaymentStatusValidationSchema = z.object({
  paymentStatus: z.enum([
    "pending",
    "paid",
    "failed",
    "refunded",
  ]),

  transactionId: z.string().min(1).optional(),
});