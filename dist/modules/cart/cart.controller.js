"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_service_1 = require("./cart.service");
const addToCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { productId, quantity } = req.body;
        const cart = await cart_service_1.cartService.addToCart(req.user.userId, productId, quantity);
        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: cart,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to add product to cart",
        });
    }
};
const getCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const cart = await cart_service_1.cartService.getCart(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: cart,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve cart",
        });
    }
};
const updateCartItem = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { productId, quantity } = req.body;
        const cart = await cart_service_1.cartService.updateCartItem(req.user.userId, productId, quantity);
        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: cart,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to update cart item",
        });
    }
};
const removeFromCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { productId } = req.body;
        const cart = await cart_service_1.cartService.removeFromCart(req.user.userId, productId);
        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cart,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to remove product",
        });
    }
};
const clearCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const cart = await cart_service_1.cartService.clearCart(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: cart,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to clear cart",
        });
    }
};
exports.cartController = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
//# sourceMappingURL=cart.controller.js.map