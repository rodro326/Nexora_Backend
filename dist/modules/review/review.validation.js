"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewApprovalValidationSchema = exports.updateReviewValidationSchema = exports.createReviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.createReviewValidationSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    orderId: zod_1.z.string().min(1, "Order ID is required"),
    rating: zod_1.z
        .number()
        .int("Rating must be an integer")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
    comment: zod_1.z
        .string()
        .min(3, "Comment must be at least 3 characters")
        .max(1000, "Comment cannot exceed 1000 characters"),
});
exports.updateReviewValidationSchema = zod_1.z.object({
    rating: zod_1.z
        .number()
        .int("Rating must be an integer")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .optional(),
    comment: zod_1.z
        .string()
        .min(3, "Comment must be at least 3 characters")
        .max(1000, "Comment cannot exceed 1000 characters")
        .optional(),
});
exports.updateReviewApprovalValidationSchema = zod_1.z.object({
    isApproved: zod_1.z.boolean(),
});
//# sourceMappingURL=review.validation.js.map