"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const payment_model_1 = __importDefault(require("./payment.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const sslcommerz_service_1 = require("./sslcommerz.service");
const crypto_1 = __importDefault(require("crypto"));
const createPayment = async (userId, payload) => {
    const order = await order_model_1.default.findOne({
        _id: payload.orderId,
        user: userId,
    }).populate("user", "name email");
    if (!order) {
        throw new Error("Order not found or does not belong to this customer");
    }
    if (order.totalAmount !== payload.amount) {
        throw new Error("Payment amount does not match order total");
    }
    const existingPayment = await payment_model_1.default.findOne({
        order: payload.orderId,
    });
    if (existingPayment) {
        throw new Error("Payment already exists for this order");
    }
    // COD payment
    if (payload.paymentMethod === "cod") {
        const payment = await payment_model_1.default.create({
            order: payload.orderId,
            user: userId,
            amount: payload.amount,
            paymentMethod: "cod",
            paymentStatus: "pending",
        });
        return {
            payment,
            gatewayUrl: null,
        };
    }
    // SSLCommerz payment
    const transactionId = payload.transactionId || `NEXORA_${crypto_1.default.randomUUID()}`;
    const customer = order.user;
    const payment = await payment_model_1.default.create({
        order: payload.orderId,
        user: userId,
        amount: payload.amount,
        paymentMethod: payload.paymentMethod,
        paymentStatus: "pending",
        transactionId,
    });
    const gatewayResponse = await (0, sslcommerz_service_1.initiatePayment)({
        totalAmount: payload.amount,
        transactionId,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: "01700000000",
    });
    return {
        payment,
        gatewayUrl: gatewayResponse.GatewayPageURL,
    };
};
const getMyPayments = async (userId) => {
    const payments = await payment_model_1.default.find({
        user: userId,
    })
        .populate("order", "totalAmount orderStatus paymentMethod")
        .sort({ createdAt: -1 });
    return payments;
};
const getPaymentByOrder = async (orderId, userId) => {
    const payment = await payment_model_1.default.findOne({
        order: orderId,
        user: userId,
    }).populate("order", "totalAmount orderStatus paymentMethod");
    return payment;
};
const updatePaymentStatus = async (paymentId, payload) => {
    const payment = await payment_model_1.default.findById(paymentId);
    if (!payment) {
        return null;
    }
    payment.paymentStatus = payload.paymentStatus;
    if (payload.transactionId !== undefined) {
        payment.transactionId = payload.transactionId;
    }
    if (payload.paymentStatus === "paid") {
        payment.paidAt = new Date();
    }
    await payment.save();
    await order_model_1.default.findByIdAndUpdate(payment.order, {
        paymentStatus: payload.paymentStatus,
    });
    return payment;
};
const getAllPayments = async () => {
    const payments = await payment_model_1.default.find()
        .populate("user", "name email")
        .populate("order", "totalAmount orderStatus paymentMethod")
        .sort({ createdAt: -1 });
    return payments;
};
exports.paymentService = {
    createPayment,
    getMyPayments,
    getPaymentByOrder,
    updatePaymentStatus,
    getAllPayments,
};
//# sourceMappingURL=payment.service.js.map