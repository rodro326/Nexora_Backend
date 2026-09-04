"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileValidationSchema = exports.updateUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50).optional(),
    phone: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateMyProfileValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50).optional(),
    phone: zod_1.z.string().min(5).max(20).optional(),
});
//# sourceMappingURL=user.validation.js.map