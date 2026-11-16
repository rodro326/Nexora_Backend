"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const cart_model_1 = __importDefault(require("../cart/cart.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
// Helper: Get chart date key
const getChartDateKey = (date, period) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    if (period === "daily") {
        return `${year}-${month}-${day}`;
    }
    if (period === "monthly") {
        return `${year}-${month}`;
    }
    // Weekly: Monday as the first day
    const monday = new Date(date);
    const dayOfWeek = monday.getUTCDay();
    const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setUTCDate(monday.getUTCDate() + difference);
    const weekYear = monday.getUTCFullYear();
    const weekMonth = String(monday.getUTCMonth() + 1).padStart(2, "0");
    const weekDay = String(monday.getUTCDate()).padStart(2, "0");
    return `${weekYear}-${weekMonth}-${weekDay}`;
};
// Helper: Get populated product information safely
const getProductInfo = (product) => {
    if (!product || typeof product !== "object") {
        return {
            productId: String(product || ""),
            productName: "Unknown Product",
            image: "",
        };
    }
    const productData = product;
    return {
        productId: String(productData._id || product),
        productName: productData.name || "Unknown Product",
        image: productData.images?.[0] || "",
    };
};
// Helper: Get item status
const getItemStatus = (itemStatus, orderStatus) => {
    if (itemStatus) {
        return itemStatus;
    }
    const validStatuses = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
    ];
    if (validStatuses.includes(orderStatus)) {
        return orderStatus;
    }
    return "pending";
};
// Create Order
const createOrder = async (userId, shippingAddress, paymentMethod) => {
    const cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }
    const orderItems = [];
    for (const cartItem of cart.items) {
        const product = await product_model_1.default.findById(cartItem.product);
        if (!product) {
            throw new Error("Product not found");
        }
        if (!product.isActive) {
            throw new Error(`Product "${product.name}" is not available`);
        }
        if (product.stock < cartItem.quantity) {
            throw new Error(`Insufficient stock for "${product.name}"`);
        }
        const subtotal = product.price * cartItem.quantity;
        orderItems.push({
            product: product._id,
            vendor: product.vendor,
            quantity: cartItem.quantity,
            price: product.price,
            subtotal,
            itemStatus: "pending",
        });
    }
    const totalAmount = orderItems.reduce((total, item) => total + item.subtotal, 0);
    const order = await order_model_1.default.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        totalAmount,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
    });
    for (const item of cart.items) {
        await product_model_1.default.findByIdAndUpdate(item.product, {
            $inc: {
                stock: -item.quantity,
            },
        });
    }
    cart.items = [];
    await cart.save();
    return order;
};
// Customer: Get My Orders
const getMyOrders = async (userId) => {
    const orders = await order_model_1.default.find({ user: userId })
        .populate("items.product", "name price images")
        .populate("items.vendor", "name email")
        .sort({ createdAt: -1 });
    return orders;
};
// Customer: Get Single Order
const getOrderById = async (orderId, userId) => {
    const order = await order_model_1.default.findOne({
        _id: orderId,
        user: userId,
    })
        .populate("items.product", "name price images")
        .populate("items.vendor", "name email");
    return order;
};
// Admin: Update Order Status
const updateOrderStatus = async (orderId, orderStatus) => {
    const order = await order_model_1.default.findById(orderId);
    if (!order) {
        return null;
    }
    order.orderStatus = orderStatus;
    // Admin confirms final delivery/cancellation for all order items.
    // This keeps item-level analytics consistent with admin order status.
    if (orderStatus === "delivered" || orderStatus === "cancelled") {
        for (const item of order.items) {
            item.itemStatus = orderStatus;
        }
    }
    await order.save();
    return order;
};
// Admin: Update Payment Status
const updatePaymentStatus = async (orderId, paymentStatus) => {
    const order = await order_model_1.default.findByIdAndUpdate(orderId, { paymentStatus }, {
        returnDocument: "after",
        runValidators: true,
    });
    return order;
};
// Vendor: Advanced Sales Analytics Report
const getVendorSalesReport = async (vendorId, options = {}) => {
    const { startDate, endDate, period = "daily", page = 1, limit = 10, } = options;
    // Validate period
    const validPeriods = [
        "daily",
        "weekly",
        "monthly",
    ];
    const selectedPeriod = validPeriods.includes(period)
        ? period
        : "daily";
    // Validate pagination
    const currentPage = Math.max(1, Math.floor(page || 1));
    const pageSize = Math.min(100, Math.max(1, Math.floor(limit || 10)));
    // Build date filter
    const dateFilter = {};
    if (startDate) {
        const parsedStartDate = new Date(startDate);
        if (Number.isNaN(parsedStartDate.getTime())) {
            throw new Error("Invalid start date");
        }
        parsedStartDate.setUTCHours(0, 0, 0, 0);
        dateFilter.$gte = parsedStartDate;
    }
    if (endDate) {
        const parsedEndDate = new Date(endDate);
        if (Number.isNaN(parsedEndDate.getTime())) {
            throw new Error("Invalid end date");
        }
        parsedEndDate.setUTCHours(23, 59, 59, 999);
        dateFilter.$lte = parsedEndDate;
    }
    if (dateFilter.$gte &&
        dateFilter.$lte &&
        dateFilter.$gte > dateFilter.$lte) {
        throw new Error("Start date cannot be after end date");
    }
    // Find only orders containing this vendor's products
    const matchQuery = {
        "items.vendor": vendorId,
    };
    if (Object.keys(dateFilter).length > 0) {
        matchQuery.createdAt = dateFilter;
    }
    const orders = await order_model_1.default.find(matchQuery)
        .populate("user", "name email")
        .populate("items.product", "name images stock")
        .sort({ createdAt: -1 });
    // Summary
    let totalRevenue = 0;
    let pendingDeliveryValue = 0;
    let totalProductsSold = 0;
    const orderStatus = {
        pending: 0,
        confirmed: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
    };
    // Chart data
    const chartMap = new Map();
    // Product performance data
    const productMap = new Map();
    const statusRank = {
        pending: 0,
        confirmed: 1,
        processing: 2,
        shipped: 3,
        delivered: 4,
        cancelled: 5,
    };
    // Vendor-specific order calculations
    const allVendorSales = orders.map((order) => {
        const vendorItems = order.items.filter((item) => item.vendor.toString() === vendorId);
        let orderRevenue = 0;
        let orderPendingValue = 0;
        let orderDeliveredQuantity = 0;
        let orderTotalQuantity = 0;
        const itemStatuses = vendorItems.map((item) => getItemStatus(item.itemStatus, order.orderStatus));
        // Count each vendor order only once by its least advanced active item
        const activeStatuses = itemStatuses.filter((status) => status !== "cancelled");
        let vendorOrderStatus = "cancelled";
        if (activeStatuses.length > 0) {
            vendorOrderStatus = activeStatuses.reduce((lowest, current) => statusRank[current] < statusRank[lowest] ? current : lowest);
        }
        orderStatus[vendorOrderStatus] += 1;
        vendorItems.forEach((item, index) => {
            const status = itemStatuses[index];
            const subtotal = Number(item.subtotal || 0);
            const quantity = Number(item.quantity || 0);
            orderTotalQuantity += quantity;
            // Delivered revenue and product performance
            if (status === "delivered") {
                orderRevenue += subtotal;
                orderDeliveredQuantity += quantity;
                const productInfo = getProductInfo(item.product);
                const existing = productMap.get(productInfo.productId);
                if (existing) {
                    existing.quantitySold += quantity;
                    existing.revenue += subtotal;
                }
                else {
                    productMap.set(productInfo.productId, {
                        ...productInfo,
                        quantitySold: quantity,
                        revenue: subtotal,
                    });
                }
            }
            // Not yet delivered and not cancelled
            if (status !== "delivered" && status !== "cancelled") {
                orderPendingValue += subtotal;
            }
        });
        totalRevenue += orderRevenue;
        pendingDeliveryValue += orderPendingValue;
        totalProductsSold += orderDeliveredQuantity;
        // Sales chart uses delivered product revenue only
        if (orderRevenue > 0 && order.createdAt) {
            const dateKey = getChartDateKey(new Date(order.createdAt), selectedPeriod);
            const existing = chartMap.get(dateKey);
            if (existing) {
                existing.revenue += orderRevenue;
                existing.orders += 1;
                existing.productsSold += orderDeliveredQuantity;
            }
            else {
                chartMap.set(dateKey, {
                    date: dateKey,
                    revenue: orderRevenue,
                    orders: 1,
                    productsSold: orderDeliveredQuantity,
                });
            }
        }
        return {
            orderId: order._id.toString(),
            customer: order.user,
            items: vendorItems,
            revenue: orderRevenue,
            deliveredRevenue: orderRevenue,
            pendingDeliveryValue: orderPendingValue,
            orderValue: vendorItems.reduce((total, item) => total + Number(item.subtotal || 0), 0),
            productsSold: orderTotalQuantity,
            deliveredProductsSold: orderDeliveredQuantity,
            orderStatus: vendorOrderStatus,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
        };
    });
    // Summary counts
    const totalOrders = orders.length - orderStatus.cancelled;
    const pendingOrders = orderStatus.pending;
    const confirmedOrders = orderStatus.confirmed;
    const processingOrders = orderStatus.processing;
    const shippedOrders = orderStatus.shipped;
    const deliveredOrders = orderStatus.delivered;
    const cancelledOrders = orderStatus.cancelled;
    const inTransitOrders = processingOrders + shippedOrders;
    // Sort chart data
    const salesOverview = Array.from(chartMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    // Product-wise performance
    const productPerformance = Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue);
    // Best selling products
    const bestSellingProducts = [...productPerformance]
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 5);
    // Vendor-specific low stock products
    const lowStockProducts = await product_model_1.default.find({
        vendor: vendorId,
        isActive: true,
        stock: { $lte: 5 },
    })
        .select("name price stock images")
        .sort({ stock: 1 })
        .limit(10)
        .lean();
    // Pagination
    const totalRecords = allVendorSales.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const skip = (currentPage - 1) * pageSize;
    const recentSales = allVendorSales.slice(skip, skip + pageSize);
    return {
        summary: {
            totalRevenue,
            pendingDeliveryValue,
            totalOrders,
            totalProductsSold,
            deliveredOrders,
            pendingOrders,
            confirmedOrders,
            processingOrders,
            shippedOrders,
            cancelledOrders,
            inTransitOrders,
        },
        orderStatus,
        salesOverview,
        productPerformance,
        bestSellingProducts,
        lowStockProducts,
        recentSales,
        pagination: {
            currentPage,
            pageSize,
            totalRecords,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },
        filters: {
            startDate: startDate || null,
            endDate: endDate || null,
            period: selectedPeriod,
        },
    };
};
// Admin: Auto-Generated Global Sales Report
const getSalesReport = async () => {
    const totalOrders = await order_model_1.default.countDocuments();
    const pendingOrders = await order_model_1.default.countDocuments({
        orderStatus: "pending",
    });
    const deliveredOrders = await order_model_1.default.countDocuments({
        orderStatus: "delivered",
    });
    const salesResult = await order_model_1.default.aggregate([
        {
            $match: {
                orderStatus: {
                    $ne: "cancelled",
                },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);
    const totalSales = salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;
    const recentOrders = await order_model_1.default.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(10);
    return {
        totalOrders,
        totalSales,
        pendingOrders,
        deliveredOrders,
        recentOrders,
    };
};
// Vendor: Get Orders Containing Vendor's Products
const getVendorOrders = async (vendorId) => {
    const orders = await order_model_1.default.find({
        "items.vendor": vendorId,
    })
        .populate("user", "name email phone")
        .populate("items.product", "name price images")
        .sort({ createdAt: -1 });
    return orders.map((order) => {
        const vendorItems = order.items.filter((item) => item.vendor.toString() === vendorId);
        return {
            _id: order._id,
            customer: order.user,
            shippingAddress: order.shippingAddress,
            items: vendorItems,
            vendorOrderTotal: vendorItems.reduce((total, item) => total + Number(item.subtotal || 0), 0),
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
        };
    });
};
// Vendor: Update own product item status
const updateVendorItemStatus = async (orderId, vendorId, productId, itemStatus) => {
    const order = await order_model_1.default.findOne({
        _id: orderId,
        items: {
            $elemMatch: {
                vendor: vendorId,
                product: productId,
            },
        },
    });
    if (!order) {
        throw new Error("Order or vendor product not found");
    }
    const item = order.items.find((currentItem) => currentItem.vendor.toString() === vendorId &&
        currentItem.product.toString() === productId);
    if (!item) {
        throw new Error("Vendor product not found");
    }
    const allowedTransitions = {
        pending: ["confirmed"],
        confirmed: ["processing"],
        processing: ["shipped"],
    };
    if (!allowedTransitions[item.itemStatus || "pending"]?.includes(itemStatus)) {
        throw new Error("Invalid order status transition");
    }
    item.itemStatus = itemStatus;
    // Derive overall order status from all item statuses
    const itemStatuses = order.items.map((orderItem) => orderItem.itemStatus || "pending");
    if (itemStatuses.every((status) => status === "cancelled")) {
        order.orderStatus = "cancelled";
    }
    else if (itemStatuses.every((status) => status === "shipped" ||
        status === "delivered" ||
        status === "cancelled")) {
        order.orderStatus = "shipped";
    }
    else if (itemStatuses.some((status) => status === "processing" ||
        status === "shipped" ||
        status === "delivered")) {
        order.orderStatus = "processing";
    }
    else if (itemStatuses.some((status) => status === "confirmed")) {
        order.orderStatus = "confirmed";
    }
    else {
        order.orderStatus = "pending";
    }
    await order.save();
    return order;
};
exports.orderService = {
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
//# sourceMappingURL=order.service.js.map