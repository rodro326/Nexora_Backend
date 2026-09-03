"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50).optional(),
    phone: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=user.validation.js.map