"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistController = void 0;
const wishlist_service_1 = require("./wishlist.service");
const addToWishlist = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { productId } = req.body;
        const wishlist = await wishlist_service_1.wishlistService.addToWishlist(req.user.userId, productId);
        res.status(200).json({
            success: true,
            message: "Product added to wishlist successfully",
            data: wishlist,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to add product to wishlist",
        });
    }
};
const getWishlist = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const wishlist = await wishlist_service_1.wishlistService.getWishlist(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Wishlist retrieved successfully",
            data: wishlist,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve wishlist",
        });
    }
};
const removeFromWishlist = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { productId } = req.body;
        const wishlist = await wishlist_service_1.wishlistService.removeFromWishlist(req.user.userId, productId);
        res.status(200).json({
            success: true,
            message: "Product removed from wishlist successfully",
            data: wishlist,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to remove product from wishlist",
        });
    }
};
const clearWishlist = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const wishlist = await wishlist_service_1.wishlistService.clearWishlist(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Wishlist cleared successfully",
            data: wishlist,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to clear wishlist",
        });
    }
};
exports.wishlistController = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
};
//# sourceMappingURL=wishlist.controller.js.map