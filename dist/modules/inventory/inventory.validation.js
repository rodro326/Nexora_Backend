"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventoryValidationSchema = exports.createInventoryValidationSchema = void 0;
const zod_1 = require("zod");
exports.createInventoryValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.number().int().min(0, "Quantity cannot be negative"),
    lowStockThreshold: zod_1.z.number().int().min(0).optional(),
});
exports.updateInventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().min(0, "Quantity cannot be negative").optional(),
    lowStockThreshold: zod_1.z.number().int().min(0).optional(),
});
//# sourceMappingURL=inventory.validation.js.map