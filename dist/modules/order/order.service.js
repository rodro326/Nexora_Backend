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
    // Weekly: Monday as the first day of the week
    const monday = new Date(date);
    const dayOfWeek = monday.getUTCDay();
    const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setUTCDate(monday.getUTCDate() + difference);
    const weekYear = monday.getUTCFullYear();
    const weekMonth = String(monday.getUTCMonth() + 1).padStart(2, "0");
    const weekDay = String(monday.getUTCDate()).padStart(2, "0");
    return `${weekYear}-${weekMonth}-${weekDay}`;
};
// Create Order
const createOrder = async (userId, shippingAddress, paymentMethod) => {
    // Keep product references as ObjectIds
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
    const order = await order_model_1.default.findByIdAndUpdate(orderId, { orderStatus }, {
        returnDocument: "after",
        runValidators: true,
    });
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
    // Find orders containing this vendor's products
    const matchQuery = {
        "items.vendor": vendorId,
    };
    if (Object.keys(dateFilter).length > 0) {
        matchQuery.createdAt = dateFilter;
    }
    const orders = await order_model_1.default.find(matchQuery)
        .populate("user", "name email")
        .populate("items.product", "name images")
        .sort({ createdAt: -1 });
    // Summary calculations
    let totalRevenue = 0;
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
    // Prepare vendor-specific sales
    const allVendorSales = orders.map((order) => {
        const vendorItems = order.items.filter((item) => item.vendor.toString() === vendorId);
        const orderValue = vendorItems.reduce((total, item) => total + Number(item.subtotal || 0), 0);
        const productsSold = vendorItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
        const status = order.orderStatus;
        if (status in orderStatus) {
            orderStatus[status] += 1;
        }
        // Revenue and product sales count only delivered orders
        if (status === "delivered") {
            totalRevenue += orderValue;
            totalProductsSold += productsSold;
            if (!order.createdAt) {
                return {
                    orderId: order._id,
                    customer: order.user,
                    items: vendorItems,
                    revenue: orderValue,
                    orderValue,
                    productsSold,
                    orderStatus: order.orderStatus,
                    paymentStatus: order.paymentStatus,
                    createdAt: order.createdAt,
                };
            }
            const dateKey = getChartDateKey(new Date(order.createdAt), selectedPeriod);
            const existing = chartMap.get(dateKey);
            if (existing) {
                existing.revenue += orderValue;
                existing.orders += 1;
                existing.productsSold += productsSold;
            }
            else {
                chartMap.set(dateKey, {
                    date: dateKey,
                    revenue: orderValue,
                    orders: 1,
                    productsSold,
                });
            }
        }
        return {
            orderId: order._id,
            customer: order.user,
            items: vendorItems,
            revenue: orderValue,
            orderValue,
            productsSold,
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
        };
    });
    // Exclude cancelled orders from total orders
    const totalOrders = orders.length - orderStatus.cancelled;
    const pendingOrders = orderStatus.pending;
    const deliveredOrders = orderStatus.delivered;
    const inTransitOrders = orderStatus.processing + orderStatus.shipped;
    // Sort chart data by date
    const salesOverview = Array.from(chartMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    // Pagination
    const totalRecords = allVendorSales.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const skip = (currentPage - 1) * pageSize;
    const recentSales = allVendorSales.slice(skip, skip + pageSize);
    return {
        summary: {
            totalRevenue,
            totalOrders,
            totalProductsSold,
            deliveredOrders,
            pendingOrders,
            confirmedOrders: orderStatus.confirmed,
            processingOrders: orderStatus.processing,
            shippedOrders: orderStatus.shipped,
            cancelledOrders: orderStatus.cancelled,
            inTransitOrders,
        },
        orderStatus,
        salesOverview,
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
    // Return only the current vendor's order items
    return orders.map((order) => {
        const vendorItems = order.items.filter((item) => item.vendor.toString() === vendorId);
        return {
            _id: order._id,
            customer: order.user,
            shippingAddress: order.shippingAddress,
            items: vendorItems,
            vendorOrderTotal: vendorItems.reduce((total, item) => total + item.subtotal, 0),
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
        };
    });
};
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
    // Update overall order status without allowing a vendor
    // to mark the complete order as delivered.
    const itemStatuses = order.items.map((orderItem) => orderItem.itemStatus || "pending");
    if (itemStatuses.every((status) => status === "cancelled")) {
        order.orderStatus = "cancelled";
    }
    else if (itemStatuses.every((status) => status === "shipped" || status === "delivered" || status === "cancelled")) {
        order.orderStatus = "shipped";
    }
    else if (itemStatuses.some((status) => status === "processing" || status === "shipped" || status === "delivered")) {
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