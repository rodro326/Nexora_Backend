import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { paymentController } from "./payment.controller";

import {
  createPaymentValidationSchema,
  updatePaymentStatusValidationSchema,
} from "./payment.validation";

const router = express.Router();

// Customer: Create payment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(createPaymentValidationSchema),
  paymentController.createPayment
);

// Customer: Get my payments
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("customer"),
  paymentController.getMyPayments
);

// Customer: Get payment by order
router.get(
  "/order/:orderId",
  authMiddleware,
  roleMiddleware("customer"),
  paymentController.getPaymentByOrder
);

// Admin: Get all payments
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  paymentController.getAllPayments
);

// Admin: Update payment status
router.patch(
  "/:paymentId/status",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updatePaymentStatusValidationSchema),
  paymentController.updatePaymentStatus
);

export default router;