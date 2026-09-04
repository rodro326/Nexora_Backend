"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const cart_model_1 = __importDefault(require("../cart/cart.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const createOrder = async (userId, shippingAddress, paymentMethod) => {
    const cart = await cart_model_1.default.findOne({ user: userId }).populate("items.product");
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
const getMyOrders = async (userId) => {
    const orders = await order_model_1.default.find({ user: userId })
        .populate("items.product", "name price images")
        .populate("items.vendor", "name email")
        .sort({ createdAt: -1 });
    return orders;
};
const getOrderById = async (orderId, userId) => {
    const order = await order_model_1.default.findOne({
        _id: orderId,
        user: userId,
    })
        .populate("items.product", "name price images")
        .populate("items.vendor", "name email");
    return order;
};
const updateOrderStatus = async (orderId, orderStatus) => {
    const order = await order_model_1.default.findByIdAndUpdate(orderId, { orderStatus }, {
        returnDocument: "after",
        runValidators: true,
    });
    return order;
};
const updatePaymentStatus = async (orderId, paymentStatus) => {
    const order = await order_model_1.default.findByIdAndUpdate(orderId, { paymentStatus }, {
        returnDocument: "after",
        runValidators: true,
    });
    return order;
};
exports.orderService = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
};
//# sourceMappingURL=order.service.js.map