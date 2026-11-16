"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { shippingAddress, paymentMethod } = req.body;
        const order = await order_service_1.orderService.createOrder(req.user.userId, shippingAddress, paymentMethod);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create order",
        });
    }
};
const getMyOrders = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const orders = await order_service_1.orderService.getMyOrders(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve orders",
        });
    }
};
const getOrderById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const orderId = req.params.orderId;
        const order = await order_service_1.orderService.getOrderById(orderId, req.user.userId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve order",
        });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { orderStatus } = req.body;
        const order = await order_service_1.orderService.updateOrderStatus(orderId, orderStatus);
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update order status",
        });
    }
};
const updatePaymentStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { paymentStatus } = req.body;
        const order = await order_service_1.orderService.updatePaymentStatus(orderId, paymentStatus);
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update payment status",
        });
    }
};
const getVendorSalesReport = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const report = await order_service_1.orderService.getVendorSalesReport(req.user.userId, {
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
        });
        res.status(200).json({
            success: true,
            message: "Sales report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve sales report",
        });
    }
};
const getVendorOrders = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const orders = await order_service_1.orderService.getVendorOrders(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Vendor orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve vendor orders",
        });
    }
};
const updateVendorItemStatus = async (req, res) => {
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
        const updatedOrder = await order_service_1.orderService.updateVendorItemStatus(orderId, req.user.userId, productId, itemStatus);
        return res.status(200).json({
            success: true,
            message: "Vendor item status updated successfully",
            data: updatedOrder,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to update vendor item status",
        });
    }
};
// Admin: Get Auto-Generated Sales Report
const getSalesReport = async (req, res) => {
    try {
        const report = await order_service_1.orderService.getSalesReport();
        res.status(200).json({
            success: true,
            message: "Sales report generated successfully",
            data: report,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to generate sales report",
        });
    }
};
exports.orderController = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    getSalesReport,
    getVendorSalesReport,
    getVendorOrders,
    updateVendorItemStatus,
};
//# sourceMappingURL=order.controller.js.map