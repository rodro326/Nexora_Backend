"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const review_model_1 = __importDefault(require("./review.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const createReview = async (userId, payload) => {
    // Check order ownership and delivered status
    const order = await order_model_1.default.findOne({
        _id: payload.orderId,
        user: userId,
        orderStatus: "delivered",
    });
    if (!order) {
        throw new Error("Order not found, does not belong to you, or is not delivered yet");
    }
    // Check whether the product exists
    const product = await product_model_1.default.findById(payload.productId);
    if (!product) {
        throw new Error("Product not found");
    }
    // Check whether the product was included in this order
    const purchasedProduct = order.items.some((item) => String(item.product) === payload.productId);
    if (!purchasedProduct) {
        throw new Error("You can only review products purchased in this order");
    }
    // Prevent duplicate review
    const existingReview = await review_model_1.default.findOne({
        product: payload.productId,
        user: userId,
        order: payload.orderId,
    });
    if (existingReview) {
        throw new Error("You have already reviewed this product for this order");
    }
    const review = await review_model_1.default.create({
        product: payload.productId,
        user: userId,
        order: payload.orderId,
        rating: payload.rating,
        comment: payload.comment,
        isApproved: false,
    });
    return review_model_1.default.findById(review._id)
        .populate("product", "name price images")
        .populate("user", "name")
        .populate("order", "totalAmount orderStatus");
};
const getProductReviews = async (productId) => {
    const reviews = await review_model_1.default.find({
        product: productId,
        isApproved: true,
    })
        .populate("user", "name")
        .sort({ createdAt: -1 });
    return reviews;
};
const getMyReviews = async (userId) => {
    const reviews = await review_model_1.default.find({
        user: userId,
    })
        .populate("product", "name price images")
        .populate("order", "totalAmount orderStatus")
        .sort({ createdAt: -1 });
    return reviews;
};
const updateReview = async (reviewId, userId, payload) => {
    const review = await review_model_1.default.findOne({
        _id: reviewId,
        user: userId,
    });
    if (!review) {
        return null;
    }
    if (payload.rating !== undefined) {
        review.rating = payload.rating;
    }
    if (payload.comment !== undefined) {
        review.comment = payload.comment;
    }
    // Updated review should require admin approval again
    review.isApproved = false;
    await review.save();
    return review_model_1.default.findById(review._id)
        .populate("product", "name price images")
        .populate("user", "name")
        .populate("order", "totalAmount orderStatus");
};
const deleteReview = async (reviewId, userId) => {
    const review = await review_model_1.default.findOneAndDelete({
        _id: reviewId,
        user: userId,
    });
    return review;
};
const getAllReviews = async () => {
    const reviews = await review_model_1.default.find()
        .populate("product", "name price images")
        .populate("user", "name email")
        .populate("order", "totalAmount orderStatus")
        .sort({ createdAt: -1 });
    return reviews;
};
const updateReviewApproval = async (reviewId, isApproved) => {
    const review = await review_model_1.default.findByIdAndUpdate(reviewId, {
        isApproved,
    }, {
        new: true,
        runValidators: true,
    })
        .populate("product", "name price images")
        .populate("user", "name email")
        .populate("order", "totalAmount orderStatus");
    return review;
};
exports.reviewService = {
    createReview,
    getProductReviews,
    getMyReviews,
    updateReview,
    deleteReview,
    getAllReviews,
    updateReviewApproval,
};
//# sourceMappingURL=review.service.js.map