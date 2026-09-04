"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const getAdminAnalytics = async () => {
    const [totalCustomers, totalVendors, totalProducts, totalOrders, revenueData, orderStatusData,] = await Promise.all([
        // Total customers
        user_model_1.default.countDocuments({ role: "customer" }),
        // Total vendors
        user_model_1.default.countDocuments({ role: "vendor" }),
        // Active products
        product_model_1.default.countDocuments({ isActive: true }),
        // Total orders
        order_model_1.default.countDocuments(),
        // Total revenue
        order_model_1.default.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    orderStatus: { $ne: "cancelled" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]),
        // Order status statistics
        order_model_1.default.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
        ]),
    ]);
    return {
        totalCustomers,
        totalVendors,
        totalProducts,
        totalOrders,
        totalRevenue: revenueData[0]?.totalRevenue || 0,
        orderStatus: orderStatusData,
    };
};
const getVendorAnalytics = async (vendorId) => {
    const [totalProducts, orderData, revenueData,] = await Promise.all([
        // Vendor's active products
        product_model_1.default.countDocuments({
            vendor: vendorId,
            isActive: true,
        }),
        // Vendor order statistics
        order_model_1.default.aggregate([
            {
                $match: {
                    "items.vendor": vendorId,
                    orderStatus: { $ne: "cancelled" },
                },
            },
            {
                $unwind: "$items",
            },
            {
                $match: {
                    "items.vendor": vendorId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalItemsSold: { $sum: "$items.quantity" },
                },
            },
        ]),
        // Vendor revenue
        order_model_1.default.aggregate([
            {
                $match: {
                    "items.vendor": vendorId,
                    paymentStatus: "paid",
                    orderStatus: { $ne: "cancelled" },
                },
            },
            {
                $unwind: "$items",
            },
            {
                $match: {
                    "items.vendor": vendorId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$items.subtotal" },
                },
            },
        ]),
    ]);
    return {
        totalProducts,
        totalOrders: orderData[0]?.totalOrders || 0,
        totalItemsSold: orderData[0]?.totalItemsSold || 0,
        totalRevenue: revenueData[0]?.totalRevenue || 0,
    };
};
exports.analyticsService = {
    getAdminAnalytics,
    getVendorAnalytics,
};
//# sourceMappingURL=analytics.service.js.map