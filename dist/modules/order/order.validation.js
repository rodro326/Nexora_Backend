"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusValidationSchema = exports.updateOrderStatusValidationSchema = exports.createOrderValidationSchema = void 0;
const zod_1 = require("zod");
const shippingAddressSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(100),
    phone: zod_1.z.string().min(5).max(20),
    address: zod_1.z.string().min(5).max(300),
    city: zod_1.z.string().min(2).max(100),
    postalCode: zod_1.z.string().min(3).max(20),
});
exports.createOrderValidationSchema = zod_1.z.object({
    shippingAddress: shippingAddressSchema,
    paymentMethod: zod_1.z.enum(["cod", "card", "online"]),
});
exports.updateOrderStatusValidationSchema = zod_1.z.object({
    orderStatus: zod_1.z.enum([
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
    ]),
});
exports.updatePaymentStatusValidationSchema = zod_1.z.object({
    paymentStatus: zod_1.z.enum([
        "pending",
        "paid",
        "failed",
        "refunded",
    ]),
});
//# sourceMappingURL=order.validation.js.map