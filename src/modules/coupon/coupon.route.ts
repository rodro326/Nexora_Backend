import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { couponController } from "./coupon.controller";

import {
  createCouponValidationSchema,
  updateCouponValidationSchema,
  applyCouponValidationSchema,
} from "./coupon.validation";

const router = express.Router();

// Admin: Create coupon
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(createCouponValidationSchema),
  couponController.createCoupon
);

// Customer: Apply coupon
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(applyCouponValidationSchema),
  couponController.applyCoupon
);

// Admin: Get all coupons
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  couponController.getAllCoupons
);

// Admin: Get coupon by ID
router.get(
  "/:couponId",
  authMiddleware,
  roleMiddleware("admin"),
  couponController.getCouponById
);

// Admin: Update coupon
router.patch(
  "/:couponId",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updateCouponValidationSchema),
  couponController.updateCoupon
);

// Admin: Delete coupon
router.delete(
  "/:couponId",
  authMiddleware,
  roleMiddleware("admin"),
  couponController.deleteCoupon
);

// Admin: Increment coupon usage
router.patch(
  "/:couponId/usage",
  authMiddleware,
  roleMiddleware("admin"),
  couponController.incrementCouponUsage
);

export default router;