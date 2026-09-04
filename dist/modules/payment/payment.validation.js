"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusValidationSchema = exports.createPaymentValidationSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentValidationSchema = zod_1.z.object({
    orderId: zod_1.z.string().min(1, "Order ID is required"),
    amount: zod_1.z
        .number()
        .positive("Payment amount must be greater than 0"),
    paymentMethod: zod_1.z.enum(["cod", "card", "online"]),
    transactionId: zod_1.z.string().min(1).optional(),
});
exports.updatePaymentStatusValidationSchema = zod_1.z.object({
    paymentStatus: zod_1.z.enum([
        "pending",
        "paid",
        "failed",
        "refunded",
    ]),
    transactionId: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=payment.validation.js.map