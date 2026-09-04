import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { withdrawalController } from "./withdrawal.controller";

import {
  createWithdrawalValidationSchema,
  updateWithdrawalStatusValidationSchema,
} from "./withdrawal.validation";

const router = express.Router();

// Vendor: Create withdrawal request
router.post(
  "/",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(createWithdrawalValidationSchema),
  withdrawalController.createWithdrawal
);

// Vendor: Get my withdrawals
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("vendor"),
  withdrawalController.getMyWithdrawals
);

// Admin: Get all withdrawals
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  withdrawalController.getAllWithdrawals
);

// Vendor: Get own withdrawal by ID
router.get(
  "/:withdrawalId",
  authMiddleware,
  roleMiddleware("vendor"),
  withdrawalController.getWithdrawalById
);

// Admin: Update withdrawal status
router.patch(
  "/:withdrawalId/status",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updateWithdrawalStatusValidationSchema),
  withdrawalController.updateWithdrawalStatus
);

// Vendor: Delete own pending withdrawal
router.delete(
  "/:withdrawalId",
  authMiddleware,
  roleMiddleware("vendor"),
  withdrawalController.deleteWithdrawal
);

export default router;