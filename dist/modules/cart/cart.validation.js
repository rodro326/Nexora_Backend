"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCartValidationSchema = exports.updateCartItemValidationSchema = exports.addToCartValidationSchema = void 0;
const zod_1 = require("zod");
exports.addToCartValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
});
exports.updateCartItemValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
});
exports.removeFromCartValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
//# sourceMappingURL=cart.validation.js.map