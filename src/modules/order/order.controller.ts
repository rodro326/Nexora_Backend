import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { orderService } from "./order.service";

const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { shippingAddress, paymentMethod } = req.body;

    const order = await orderService.createOrder(
      req.user.userId,
      shippingAddress,
      paymentMethod
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    });
  }
};

const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const orders = await orderService.getMyOrders(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve orders",
    });
  }
};

const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const orderId = req.params.orderId as string;

    const order = await orderService.getOrderById(
      orderId,
      req.user.userId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve order",
    });
  }
};

const updateOrderStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orderId = req.params.orderId as string;
    const { orderStatus } = req.body;

    const order = await orderService.updateOrderStatus(
      orderId,
      orderStatus
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update order status",
    });
  }
};

const updatePaymentStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orderId = req.params.orderId as string;
    const { paymentStatus } = req.body;

    const order = await orderService.updatePaymentStatus(
      orderId,
      paymentStatus
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update payment status",
    });
  }
};


const getVendorSalesReport = async (
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

    const report = await orderService.getVendorSalesReport(
      req.user.userId,
      {
        startDate: req.query.startDate
          ? String(req.query.startDate)
          : undefined,
        endDate: req.query.endDate
          ? String(req.query.endDate)
          : undefined,
        period: req.query.period
          ? String(req.query.period)
          : "daily",
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      }
    );

    res.status(200).json({
      success: true,
      message: "Sales report retrieved successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve sales report",
    });
  }
};

const getVendorOrders = async (
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

    const orders = await orderService.getVendorOrders(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Vendor orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve vendor orders",
    });
  }
};

const updateVendorItemStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orderId = String(req.params.orderId);
    const productId = String(req.params.productId);
    const { itemStatus } = req.body;

    const updatedOrder = await orderService.updateVendorItemStatus(
      orderId,
      req.user.userId,
      productId,
      itemStatus
    );

    return res.status(200).json({
      success: true,
      message: "Vendor item status updated successfully",
      data: updatedOrder,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update vendor item status",
    });
  }
};


// Admin: Get Auto-Generated Sales Report
const getSalesReport = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const report = await orderService.getSalesReport();

    res.status(200).json({
      success: true,
      message: "Sales report generated successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to generate sales report",
    });
  }
};







export const orderController = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  getSalesReport,
  getVendorSalesReport,
  getVendorOrders,
  updateVendorItemStatus ,
};