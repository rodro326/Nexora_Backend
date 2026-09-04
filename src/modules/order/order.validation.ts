import { z } from "zod";

const shippingAddressSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(5).max(20),
  address: z.string().min(5).max(300),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(3).max(20),
});

export const createOrderValidationSchema = z.object({
  shippingAddress: shippingAddressSchema,

  paymentMethod: z.enum(["cod", "card", "online"]),
});

export const updateOrderStatusValidationSchema = z.object({
  orderStatus: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});

export const updatePaymentStatusValidationSchema = z.object({
  paymentStatus: z.enum([
    "pending",
    "paid",
    "failed",
    "refunded",
  ]),
});