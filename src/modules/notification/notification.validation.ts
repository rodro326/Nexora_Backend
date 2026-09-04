import { z } from "zod";

export const createNotificationValidationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(2).max(100),
  message: z.string().min(2).max(500),
  type: z.enum([
    "order",
    "payment",
    "shipping",
    "promotion",
    "system",
  ]),
});

export const markNotificationReadValidationSchema = z.object({
  notificationId: z.string().min(1, "Notification ID is required"),
});