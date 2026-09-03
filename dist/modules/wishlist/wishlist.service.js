"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistService = void 0;
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const addToWishlist = async (userId, productId) => {
    const product = await product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (!product.isActive) {
        throw new Error("This product is not available");
    }
    let wishlist = await wishlist_model_1.default.findOne({ user: userId });
    if (!wishlist) {
        wishlist = await wishlist_model_1.default.create({
            user: userId,
            products: [productId],
        });
    }
    else {
        const alreadyExists = wishlist.products.some((id) => id.toString() === productId);
        if (alreadyExists) {
            throw new Error("Product is already in wishlist");
        }
        wishlist.products.push(productId);
        await wishlist.save();
    }
    return wishlist;
};
const getWishlist = async (userId) => {
    const wishlist = await wishlist_model_1.default.findOne({
        user: userId,
    }).populate("products", "name price stock images");
    return wishlist;
};
const removeFromWishlist = async (userId, productId) => {
    const wishlist = await wishlist_model_1.default.findOne({
        user: userId,
    });
    if (!wishlist) {
        throw new Error("Wishlist not found");
    }
    const initialLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    if (wishlist.products.length === initialLength) {
        throw new Error("Product not found in wishlist");
    }
    await wishlist.save();
    return wishlist;
};
const clearWishlist = async (userId) => {
    const wishlist = await wishlist_model_1.default.findOne({
        user: userId,
    });
    if (!wishlist) {
        throw new Error("Wishlist not found");
    }
    wishlist.products = [];
    await wishlist.save();
    return wishlist;
};
exports.wishlistService = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
};
//# sourceMappingURL=wishlist.service.js.map