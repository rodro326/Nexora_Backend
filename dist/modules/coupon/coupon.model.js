"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: [true, "Coupon code is required"],
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: [true, "Discount type is required"],
    },
    discountValue: {
        type: Number,
        required: [true, "Discount value is required"],
        min: [0, "Discount value cannot be negative"],
    },
    minOrderAmount: {
        type: Number,
        min: [0, "Minimum order amount cannot be negative"],
        default: 0,
    },
    maxDiscountAmount: {
        type: Number,
        min: [0, "Maximum discount amount cannot be negative"],
    },
    usageLimit: {
        type: Number,
        min: [1, "Usage limit must be at least 1"],
    },
    usedCount: {
        type: Number,
        default: 0,
        min: [0, "Used count cannot be negative"],
    },
    startDate: {
        type: Date,
    },
    expiryDate: {
        type: Date,
        required: [true, "Expiry date is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"],
    },
}, {
    timestamps: true,
});
const Coupon = (0, mongoose_1.model)("Coupon", couponSchema);
exports.default = Coupon;
//# sourceMappingURL=coupon.model.js.map