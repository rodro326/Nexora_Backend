"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(150),
    description: zod_1.z.string().min(10),
    price: zod_1.z.number().min(0),
    stock: zod_1.z.number().int().min(0),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    category: zod_1.z.string().min(1),
    brand: zod_1.z.string().min(1),
});
exports.updateProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(150).optional(),
    description: zod_1.z.string().min(10).optional(),
    price: zod_1.z.number().min(0).optional(),
    stock: zod_1.z.number().int().min(0).optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    category: zod_1.z.string().min(1).optional(),
    brand: zod_1.z.string().min(1).optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=product.validation.js.map