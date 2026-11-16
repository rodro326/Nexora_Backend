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

    const requestedPeriod = String(req.query.period || "daily");

    if (!["daily", "weekly", "monthly"].includes(requestedPeriod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid period. Use daily, weekly or monthly.",
      });
    }

    const analytics = await analyticsService.getAdminAnalytics(
      requestedPeriod as "daily" | "weekly" | "monthly"
    );

    return res.status(200).json({
      success: true,
      message: "Admin analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    return res.status(500).json({
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

    const requestedPeriod = String(req.query.period || "daily");

    if (!["daily", "weekly", "monthly"].includes(requestedPeriod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid period. Use daily, weekly or monthly.",
      });
    }

    const analytics = await analyticsService.getVendorAnalytics(
      req.user.userId,
      requestedPeriod as "daily" | "weekly" | "monthly"
    );

    return res.status(200).json({
      success: true,
      message: "Vendor analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    return res.status(500).json({
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