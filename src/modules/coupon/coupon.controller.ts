import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { couponService } from "./coupon.service";

const createCoupon = async (
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

    const coupon = await couponService.createCoupon(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create coupon",
    });
  }
};

const getAllCoupons = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const coupons = await couponService.getAllCoupons();

    return res.status(200).json({
      success: true,
      message: "Coupons retrieved successfully",
      data: coupons,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve coupons",
    });
  }
};

const getCouponById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const coupon = await couponService.getCouponById(
      String(req.params.couponId)
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon retrieved successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve coupon",
    });
  }
};

const updateCoupon = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const coupon = await couponService.updateCoupon(
      String(req.params.couponId),
      req.body
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update coupon",
    });
  }
};

const deleteCoupon = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const coupon = await couponService.deleteCoupon(
      String(req.params.couponId)
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete coupon",
    });
  }
};

const applyCoupon = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await couponService.applyCoupon(
      req.body.code,
      req.body.orderAmount
    );

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to apply coupon",
    });
  }
};

const incrementCouponUsage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const coupon = await couponService.incrementCouponUsage(
      String(req.params.couponId)
    );

    return res.status(200).json({
      success: true,
      message: "Coupon usage updated successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update coupon usage",
    });
  }
};

export const couponController = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  incrementCouponUsage,
};