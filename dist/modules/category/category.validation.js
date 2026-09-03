"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidationSchema = exports.createCategoryValidationSchema = void 0;
const zod_1 = require("zod");
exports.createCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    slug: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().max(500).optional(),
    image: zod_1.z.string().optional(),
});
exports.updateCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).optional(),
    slug: zod_1.z.string().min(2).max(100).optional(),
    description: zod_1.z.string().max(500).optional(),
    image: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=category.validation.js.map