"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("../user/user.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const getDateRange = (period) => {
    const now = new Date();
    const startDate = new Date(now);
    if (period === "daily") {
        startDate.setDate(startDate.getDate() - 6);
    }
    else if (period === "weekly") {
        startDate.setDate(startDate.getDate() - 55);
    }
    else {
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1);
    }
    return { now, startDate };
};
// ADMIN ANALYTICS
const getAdminAnalytics = async (period = "daily") => {
    const { now, startDate } = getDateRange(period);
    const chartFormat = period === "daily"
        ? "%Y-%m-%d"
        : period === "weekly"
            ? "%G-W%V"
            : "%Y-%m";
    const [totalCustomers, totalVendors, totalProducts, totalOrders, totalRevenueData, orderStatusData, salesOverview, recentOrders,] = await Promise.all([
        user_model_1.default.countDocuments({ role: "customer" }),
        user_model_1.default.countDocuments({ role: "vendor" }),
        product_model_1.default.countDocuments({ isActive: true }),
        order_model_1.default.countDocuments(),
        order_model_1.default.aggregate([
            { $match: { orderStatus: "delivered" } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]),
        order_model_1.default.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 },
                },
            },
        ]),
        order_model_1.default.aggregate([
            {
                $match: {
                    orderStatus: "delivered",
                    createdAt: { $gte: startDate, $lte: now },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: chartFormat,
                            date: "$createdAt",
                            timezone: "Asia/Dhaka",
                        },
                    },
                    revenue: { $sum: "$totalAmount" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    revenue: 1,
                    orders: 1,
                },
            },
        ]),
        order_model_1.default.find()
            .sort({ createdAt: -1 })
            .limit(8)
            .select("user totalAmount orderStatus paymentStatus createdAt")
            .populate("user", "name email")
            .lean(),
    ]);
    const orderStatus = {
        pending: 0,
        confirmed: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
    };
    orderStatusData.forEach((item) => {
        if (item._id in orderStatus) {
            orderStatus[item._id] =
                item.count;
        }
    });
    return {
        summary: {
            totalRevenue: totalRevenueData[0]?.totalRevenue || 0,
            totalOrders,
            totalCustomers,
            totalVendors,
            totalProducts,
            deliveredOrders: orderStatus.delivered,
            pendingOrders: orderStatus.pending,
        },
        orderStatus,
        salesOverview,
        recentOrders,
        filters: {
            period,
            startDate,
            endDate: now,
        },
    };
};
// VENDOR ANALYTICS
const getVendorAnalytics = async (vendorId, period = "daily") => {
    const vendorObjectId = new mongoose_1.Types.ObjectId(vendorId);
    const { now, startDate } = getDateRange(period);
    const chartFormat = period === "daily"
        ? "%Y-%m-%d"
        : period === "weekly"
            ? "%G-W%V"
            : "%Y-%m";
    const vendorOrderMatch = {
        "items.vendor": vendorObjectId,
    };
    const itemStatusExpression = {
        $ifNull: ["$items.itemStatus", "pending"],
    };
    const [totalProducts, totalOrders, totalRevenueData, salesOverview, itemStatusData, lowStockProducts, recentOrders, topProducts,] = await Promise.all([
        // Active vendor products
        product_model_1.default.countDocuments({
            vendor: vendorObjectId,
            isActive: true,
        }),
        // Distinct orders containing this vendor's products
        order_model_1.default.countDocuments(vendorOrderMatch),
        // Revenue from delivered vendor items only
        order_model_1.default.aggregate([
            { $match: vendorOrderMatch },
            { $unwind: "$items" },
            {
                $match: {
                    "items.vendor": vendorObjectId,
                    $expr: {
                        $eq: [itemStatusExpression, "delivered"],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$items.subtotal" },
                    totalItemsSold: { $sum: "$items.quantity" },
                },
            },
        ]),
        // Date-wise delivered vendor sales
        order_model_1.default.aggregate([
            {
                $match: {
                    ...vendorOrderMatch,
                    createdAt: { $gte: startDate, $lte: now },
                },
            },
            { $unwind: "$items" },
            {
                $match: {
                    "items.vendor": vendorObjectId,
                    $expr: {
                        $eq: [itemStatusExpression, "delivered"],
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: chartFormat,
                            date: "$createdAt",
                            timezone: "Asia/Dhaka",
                        },
                    },
                    revenue: { $sum: "$items.subtotal" },
                    orders: { $addToSet: "$_id" },
                },
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    revenue: 1,
                    orders: { $size: "$orders" },
                },
            },
        ]),
        // Vendor item status breakdown
        order_model_1.default.aggregate([
            { $match: vendorOrderMatch },
            { $unwind: "$items" },
            {
                $match: {
                    "items.vendor": vendorObjectId,
                },
            },
            {
                $group: {
                    _id: itemStatusExpression,
                    count: { $sum: 1 },
                },
            },
        ]),
        // Low stock products (stock <= 5)
        product_model_1.default.find({
            vendor: vendorObjectId,
            isActive: true,
            stock: { $lte: 5 },
        })
            .select("name price stock images")
            .sort({ stock: 1 })
            .limit(8)
            .lean(),
        // Latest orders containing vendor products
        order_model_1.default.find(vendorOrderMatch)
            .sort({ createdAt: -1 })
            .limit(8)
            .populate("user", "name email")
            .populate("items.product", "name price images")
            .lean(),
        // Top selling products (delivered quantities)
        order_model_1.default.aggregate([
            { $match: vendorOrderMatch },
            { $unwind: "$items" },
            {
                $match: {
                    "items.vendor": vendorObjectId,
                    $expr: {
                        $eq: [itemStatusExpression, "delivered"],
                    },
                },
            },
            {
                $group: {
                    _id: "$items.product",
                    totalSold: { $sum: "$items.quantity" },
                    revenue: { $sum: "$items.subtotal" },
                },
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                    _id: 1,
                    name: "$product.name",
                    price: "$product.price",
                    images: "$product.images",
                    totalSold: 1,
                    revenue: 1,
                },
            },
        ]),
    ]);
    const itemStatus = {
        pending: 0,
        confirmed: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
    };
    itemStatusData.forEach((item) => {
        if (item._id in itemStatus) {
            itemStatus[item._id] =
                item.count;
        }
    });
    // Keep only this vendor's items in recent orders.
    const formattedRecentOrders = recentOrders.map((order) => {
        const vendorItems = order.items.filter((item) => item.vendor?.toString() === vendorId);
        return {
            _id: order._id,
            customer: order.user,
            items: vendorItems,
            vendorOrderTotal: vendorItems.reduce((total, item) => total + item.subtotal, 0),
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
        };
    });
    return {
        summary: {
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenueData[0]?.totalRevenue || 0,
            totalItemsSold: totalRevenueData[0]?.totalItemsSold || 0,
            pendingOrders: itemStatus.pending,
            confirmedOrders: itemStatus.confirmed,
            processingOrders: itemStatus.processing,
            shippedOrders: itemStatus.shipped,
            deliveredOrders: itemStatus.delivered,
            cancelledOrders: itemStatus.cancelled,
            lowStockItems: lowStockProducts.length,
        },
        itemStatus,
        salesOverview,
        recentOrders: formattedRecentOrders,
        lowStockProducts,
        topProducts,
        filters: {
            period,
            startDate,
            endDate: now,
        },
    };
};
exports.analyticsService = {
    getAdminAnalytics,
    getVendorAnalytics,
};
//# sourceMappingURL=analytics.service.js.map