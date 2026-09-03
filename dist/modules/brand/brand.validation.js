"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandValidationSchema = exports.createBrandValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBrandValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    slug: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().max(500).optional(),
    logo: zod_1.z.string().optional(),
});
exports.updateBrandValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).optional(),
    slug: zod_1.z.string().min(2).max(100).optional(),
    description: zod_1.z.string().max(500).optional(),
    logo: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=brand.validation.js.map