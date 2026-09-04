import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { reviewController } from "./review.controller";

import {
  createReviewValidationSchema,
  updateReviewValidationSchema,
  updateReviewApprovalValidationSchema,
} from "./review.validation";

const router = express.Router();

// Customer: Create review
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(createReviewValidationSchema),
  reviewController.createReview
);

// Public: Get approved reviews for a product
router.get(
  "/product/:productId",
  reviewController.getProductReviews
);

// Customer: Get my reviews
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("customer"),
  reviewController.getMyReviews
);

// Customer: Update own review
router.patch(
  "/:reviewId",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(updateReviewValidationSchema),
  reviewController.updateReview
);

// Customer: Delete own review
router.delete(
  "/:reviewId",
  authMiddleware,
  roleMiddleware("customer"),
  reviewController.deleteReview
);

// Admin: Get all reviews
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  reviewController.getAllReviews
);

// Admin: Approve/reject review
router.patch(
  "/:reviewId/approval",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updateReviewApprovalValidationSchema),
  reviewController.updateReviewApproval
);

export default router;