import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";

import { analyticsController } from "./analytics.controller";

const router = express.Router();

// Admin analytics
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  analyticsController.getAdminAnalytics
);

// Vendor analytics
router.get(
  "/vendor",
  authMiddleware,
  roleMiddleware("vendor"),
  analyticsController.getVendorAnalytics
);

export default router;