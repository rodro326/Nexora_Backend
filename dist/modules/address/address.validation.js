"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressValidationSchema = exports.createAddressValidationSchema = void 0;
const zod_1 = require("zod");
exports.createAddressValidationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(100),
    phone: zod_1.z.string().min(5).max(20),
    address: zod_1.z.string().min(5).max(300),
    city: zod_1.z.string().min(2).max(100),
    postalCode: zod_1.z.string().min(3).max(20),
    isDefault: zod_1.z.boolean().optional(),
});
exports.updateAddressValidationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(100).optional(),
    phone: zod_1.z.string().min(5).max(20).optional(),
    address: zod_1.z.string().min(5).max(300).optional(),
    city: zod_1.z.string().min(2).max(100).optional(),
    postalCode: zod_1.z.string().min(3).max(20).optional(),
    isDefault: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=address.validation.js.map