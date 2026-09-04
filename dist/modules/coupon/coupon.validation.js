"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCouponValidationSchema = exports.updateCouponValidationSchema = exports.createCouponValidationSchema = void 0;
const zod_1 = require("zod");
exports.createCouponValidationSchema = zod_1.z
    .object({
    code: zod_1.z
        .string()
        .min(3, "Coupon code must be at least 3 characters")
        .max(30, "Coupon code cannot exceed 30 characters"),
    description: zod_1.z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    discountType: zod_1.z.enum(["percentage", "fixed"]),
    discountValue: zod_1.z
        .number()
        .positive("Discount value must be greater than 0"),
    minOrderAmount: zod_1.z
        .number()
        .min(0, "Minimum order amount cannot be negative")
        .optional(),
    maxDiscountAmount: zod_1.z
        .number()
        .positive("Maximum discount amount must be greater than 0")
        .optional(),
    usageLimit: zod_1.z
        .number()
        .int("Usage limit must be an integer")
        .positive("Usage limit must be greater than 0")
        .optional(),
    startDate: zod_1.z.string().datetime().optional(),
    expiryDate: zod_1.z.string().datetime("Invalid expiry date"),
    isActive: zod_1.z.boolean().optional(),
})
    .refine((data) => {
    if (data.discountType === "percentage") {
        return data.discountValue <= 100;
    }
    return true;
}, {
    message: "Percentage discount cannot exceed 100",
    path: ["discountValue"],
})
    .refine((data) => {
    if (data.startDate && data.expiryDate) {
        return new Date(data.expiryDate) > new Date(data.startDate);
    }
    return true;
}, {
    message: "Expiry date must be after start date",
    path: ["expiryDate"],
});
exports.updateCouponValidationSchema = zod_1.z
    .object({
    description: zod_1.z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    discountType: zod_1.z
        .enum(["percentage", "fixed"])
        .optional(),
    discountValue: zod_1.z
        .number()
        .positive("Discount value must be greater than 0")
        .optional(),
    minOrderAmount: zod_1.z
        .number()
        .min(0, "Minimum order amount cannot be negative")
        .optional(),
    maxDiscountAmount: zod_1.z
        .number()
        .positive("Maximum discount amount must be greater than 0")
        .optional(),
    usageLimit: zod_1.z
        .number()
        .int("Usage limit must be an integer")
        .positive("Usage limit must be greater than 0")
        .optional(),
    startDate: zod_1.z.string().datetime().optional(),
    expiryDate: zod_1.z.string().datetime().optional(),
    isActive: zod_1.z.boolean().optional(),
})
    .refine((data) => {
    if (data.discountType === "percentage" &&
        data.discountValue !== undefined) {
        return data.discountValue <= 100;
    }
    return true;
}, {
    message: "Percentage discount cannot exceed 100",
    path: ["discountValue"],
});
exports.applyCouponValidationSchema = zod_1.z.object({
    code: zod_1.z
        .string()
        .min(3, "Coupon code is required")
        .max(30, "Coupon code cannot exceed 30 characters"),
    orderAmount: zod_1.z
        .number()
        .positive("Order amount must be greater than 0"),
});
//# sourceMappingURL=coupon.validation.js.map