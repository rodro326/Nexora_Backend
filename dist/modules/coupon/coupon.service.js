"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponService = void 0;
const coupon_model_1 = __importDefault(require("./coupon.model"));
const createCoupon = async (adminId, payload) => {
    const code = payload.code.trim().toUpperCase();
    const existingCoupon = await coupon_model_1.default.findOne({ code });
    if (existingCoupon) {
        throw new Error("Coupon code already exists");
    }
    if (payload.discountType === "percentage" &&
        payload.discountValue > 100) {
        throw new Error("Percentage discount cannot exceed 100");
    }
    const startDate = payload.startDate
        ? new Date(payload.startDate)
        : new Date();
    const expiryDate = new Date(payload.expiryDate);
    if (expiryDate <= startDate) {
        throw new Error("Expiry date must be after start date");
    }
    const coupon = await coupon_model_1.default.create({
        code,
        description: payload.description,
        discountType: payload.discountType,
        discountValue: payload.discountValue,
        minOrderAmount: payload.minOrderAmount ?? 0,
        maxDiscountAmount: payload.maxDiscountAmount,
        usageLimit: payload.usageLimit,
        usedCount: 0,
        startDate,
        expiryDate,
        isActive: payload.isActive ?? true,
        createdBy: adminId,
    });
    return coupon;
};
const getAllCoupons = async () => {
    const coupons = await coupon_model_1.default.find()
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });
    return coupons;
};
const getCouponById = async (couponId) => {
    const coupon = await coupon_model_1.default.findById(couponId).populate("createdBy", "name email");
    return coupon;
};
const updateCoupon = async (couponId, payload) => {
    const coupon = await coupon_model_1.default.findById(couponId);
    if (!coupon) {
        return null;
    }
    const discountType = payload.discountType ?? coupon.discountType;
    const discountValue = payload.discountValue ?? coupon.discountValue;
    if (discountType === "percentage" &&
        discountValue > 100) {
        throw new Error("Percentage discount cannot exceed 100");
    }
    const startDate = payload.startDate
        ? new Date(payload.startDate)
        : coupon.startDate ?? new Date();
    const expiryDate = payload.expiryDate
        ? new Date(payload.expiryDate)
        : coupon.expiryDate;
    if (expiryDate <= startDate) {
        throw new Error("Expiry date must be after start date");
    }
    if (payload.description !== undefined) {
        coupon.description = payload.description;
    }
    if (payload.discountType !== undefined) {
        coupon.discountType = payload.discountType;
    }
    if (payload.discountValue !== undefined) {
        coupon.discountValue = payload.discountValue;
    }
    if (payload.minOrderAmount !== undefined) {
        coupon.minOrderAmount = payload.minOrderAmount;
    }
    if (payload.maxDiscountAmount !== undefined) {
        coupon.maxDiscountAmount = payload.maxDiscountAmount;
    }
    if (payload.usageLimit !== undefined) {
        coupon.usageLimit = payload.usageLimit;
    }
    if (payload.startDate !== undefined) {
        coupon.startDate = new Date(payload.startDate);
    }
    if (payload.expiryDate !== undefined) {
        coupon.expiryDate = new Date(payload.expiryDate);
    }
    if (payload.isActive !== undefined) {
        coupon.isActive = payload.isActive;
    }
    await coupon.save();
    return coupon_model_1.default.findById(coupon._id).populate("createdBy", "name email");
};
const deleteCoupon = async (couponId) => {
    const coupon = await coupon_model_1.default.findByIdAndDelete(couponId);
    return coupon;
};
const applyCoupon = async (code, orderAmount) => {
    const coupon = await coupon_model_1.default.findOne({
        code: code.trim().toUpperCase(),
    });
    if (!coupon) {
        throw new Error("Coupon not found");
    }
    const now = new Date();
    if (!coupon.isActive) {
        throw new Error("Coupon is inactive");
    }
    if (coupon.startDate && now < coupon.startDate) {
        throw new Error("Coupon is not active yet");
    }
    if (now > coupon.expiryDate) {
        throw new Error("Coupon has expired");
    }
    if (coupon.usageLimit !== undefined &&
        coupon.usedCount >= coupon.usageLimit) {
        throw new Error("Coupon usage limit has been reached");
    }
    if (coupon.minOrderAmount !== undefined &&
        orderAmount < coupon.minOrderAmount) {
        throw new Error(`Minimum order amount is ${coupon.minOrderAmount}`);
    }
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
        discountAmount =
            (orderAmount * coupon.discountValue) / 100;
        if (coupon.maxDiscountAmount !== undefined &&
            discountAmount > coupon.maxDiscountAmount) {
            discountAmount = coupon.maxDiscountAmount;
        }
    }
    else {
        discountAmount = coupon.discountValue;
        if (discountAmount > orderAmount) {
            discountAmount = orderAmount;
        }
    }
    const finalAmount = orderAmount - discountAmount;
    return {
        couponId: coupon._id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        orderAmount,
        discountAmount,
        finalAmount,
    };
};
const incrementCouponUsage = async (couponId) => {
    const coupon = await coupon_model_1.default.findOneAndUpdate({
        _id: couponId,
        isActive: true,
        $or: [
            { usageLimit: { $exists: false } },
            {
                $expr: {
                    $lt: ["$usedCount", "$usageLimit"],
                },
            },
        ],
    }, {
        $inc: {
            usedCount: 1,
        },
    }, {
        new: true,
    });
    if (!coupon) {
        throw new Error("Coupon usage limit has been reached or coupon is inactive");
    }
    return coupon;
};
exports.couponService = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    applyCoupon,
    incrementCouponUsage,
};
//# sourceMappingURL=coupon.service.js.map