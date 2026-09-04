"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWithdrawalStatusValidationSchema = exports.createWithdrawalValidationSchema = void 0;
const zod_1 = require("zod");
exports.createWithdrawalValidationSchema = zod_1.z.object({
    amount: zod_1.z
        .number()
        .positive("Withdrawal amount must be greater than 0"),
    paymentMethod: zod_1.z.enum(["bank", "mobile_banking"]),
    accountNumber: zod_1.z
        .string()
        .min(5, "Account number is required")
        .max(50, "Account number cannot exceed 50 characters"),
    note: zod_1.z
        .string()
        .max(500, "Note cannot exceed 500 characters")
        .optional(),
});
exports.updateWithdrawalStatusValidationSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "pending",
        "approved",
        "rejected",
        "processed",
    ]),
});
//# sourceMappingURL=withdrawal.validation.js.map