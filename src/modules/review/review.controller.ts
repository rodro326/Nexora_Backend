import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { reviewService } from "./review.service";

const createReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const review = await reviewService.createReview(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create review",
    });
  }
};

const getProductReviews = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const reviews = await reviewService.getProductReviews(
      String(req.params.productId)
    );

    return res.status(200).json({
      success: true,
      message: "Product reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve product reviews",
    });
  }
};

const getMyReviews = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const reviews = await reviewService.getMyReviews(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "My reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve reviews",
    });
  }
};

const updateReview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const review = await reviewService.updateReview(
      String(req.params.reviewId),
      req.user.userId,
      req.body
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update review",
    });
  }
};

const deleteReview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const review = await reviewService.deleteReview(
      String(req.params.reviewId),
      req.user.userId
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete review",
    });
  }
};

const getAllReviews = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const reviews = await reviewService.getAllReviews();

    return res.status(200).json({
      success: true,
      message: "All reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve reviews",
    });
  }
};

const updateReviewApproval = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const review = await reviewService.updateReviewApproval(
      String(req.params.reviewId),
      req.body.isApproved
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review approval status updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update review approval",
    });
  }
};

export const reviewController = {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getAllReviews,
  updateReviewApproval,
};