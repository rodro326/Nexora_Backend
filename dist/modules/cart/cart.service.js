"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const cart_model_1 = __importDefault(require("./cart.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const addToCart = async (userId, productId, quantity) => {
    const product = await product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (!product.isActive) {
        throw new Error("This product is not available");
    }
    if (product.stock < quantity) {
        throw new Error("Insufficient stock");
    }
    let cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart) {
        cart = await cart_model_1.default.create({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity,
                },
            ],
        });
    }
    else {
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (product.stock < newQuantity) {
                throw new Error("Insufficient stock");
            }
            existingItem.quantity = newQuantity;
        }
        else {
            cart.items.push({
                product: productId,
                quantity,
            });
        }
        await cart.save();
    }
    return cart;
};
const getCart = async (userId) => {
    const cart = await cart_model_1.default.findOne({ user: userId }).populate("items.product", "name price stock images");
    return cart;
};
const updateCartItem = async (userId, productId, quantity) => {
    const cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }
    const item = cart.items.find((cartItem) => cartItem.product.toString() === productId);
    if (!item) {
        throw new Error("Product not found in cart");
    }
    const product = await product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.stock < quantity) {
        throw new Error("Insufficient stock");
    }
    item.quantity = quantity;
    await cart.save();
    return cart;
};
const removeFromCart = async (userId, productId) => {
    const cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }
    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    if (cart.items.length === initialLength) {
        throw new Error("Product not found in cart");
    }
    await cart.save();
    return cart;
};
const clearCart = async (userId) => {
    const cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }
    cart.items = [];
    await cart.save();
    return cart;
};
exports.cartService = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
//# sourceMappingURL=cart.service.js.map