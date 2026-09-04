import { z } from "zod";

export const aiChatValidationSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message cannot exceed 2000 characters"),
});