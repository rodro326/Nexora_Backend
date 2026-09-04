import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { aiChatController } from "./ai.controller";
import { aiChatValidationSchema } from "./ai.validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validationMiddleware(aiChatValidationSchema),
  aiChatController.sendMessage
);

export default router;