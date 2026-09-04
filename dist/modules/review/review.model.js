"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Order is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        trim: true,
        minlength: [3, "Comment must be at least 3 characters"],
        maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// One customer can review a product only once per order
reviewSchema.index({ product: 1, user: 1, order: 1 }, { unique: true });
const Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.model.js.map