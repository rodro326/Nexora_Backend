import express from "express";
import { authController } from "./auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import {
  registerValidationSchema,
  loginValidationSchema,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validationMiddleware(registerValidationSchema),
  authController.registerUser
);

router.post(
  "/login",
  validationMiddleware(loginValidationSchema),
  authController.loginUser
);

export default router;