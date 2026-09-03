"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlistValidationSchema = exports.addToWishlistValidationSchema = void 0;
const zod_1 = require("zod");
exports.addToWishlistValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
exports.removeFromWishlistValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
//# sourceMappingURL=wishlist.validation.js.map