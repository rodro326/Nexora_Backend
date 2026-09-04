import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { analyticsService } from "./analytics.service";

// Admin analytics
const getAdminAnalytics = async (
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

    const analytics = await analyticsService.getAdminAnalytics();

    res.status(200).json({
      success: true,
      message: "Admin analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve admin analytics",
    });
  }
};

// Vendor analytics
const getVendorAnalytics = async (
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

    const analytics = await analyticsService.getVendorAnalytics(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Vendor analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve vendor analytics",
    });
  }
};

export const analyticsController = {
  getAdminAnalytics,
  getVendorAnalytics,
};