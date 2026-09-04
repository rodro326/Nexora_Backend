import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { paymentService } from "./payment.service";

const createPayment = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const payment = await paymentService.createPayment(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create payment",
    });
  }
};

const getMyPayments = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const payments = await paymentService.getMyPayments(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve payments",
    });
  }
};

const getPaymentByOrder = async (
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

    const payment = await paymentService.getPaymentByOrder(
      String(req.params.orderId),
      req.user.userId
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve payment",
    });
  }
};

const updatePaymentStatus = async (
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

    const payment = await paymentService.updatePaymentStatus(
      String(req.params.paymentId),
      req.body
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update payment status",
    });
  }
};

const getAllPayments = async (
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

    const payments = await paymentService.getAllPayments();

    return res.status(200).json({
      success: true,
      message: "All payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve payments",
    });
  }
};

export const paymentController = {
  createPayment,
  getMyPayments,
  getPaymentByOrder,
  updatePaymentStatus,
  getAllPayments,
};