import Review from "./review.model";
import Order from "../order/order.model";
import Product from "../product/product.model";

const createReview = async (
  userId: string,
  payload: {
    productId: string;
    orderId: string;
    rating: number;
    comment: string;
  }
) => {
  // Check order ownership and delivered status
  const order = await Order.findOne({
    _id: payload.orderId,
    user: userId,
    orderStatus: "delivered",
  });

  if (!order) {
    throw new Error(
      "Order not found, does not belong to you, or is not delivered yet"
    );
  }

  // Check whether the product exists
  const product = await Product.findById(payload.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // Check whether the product was included in this order
  const purchasedProduct = order.items.some(
    (item) => String(item.product) === payload.productId
  );

  if (!purchasedProduct) {
    throw new Error(
      "You can only review products purchased in this order"
    );
  }

  // Prevent duplicate review
  const existingReview = await Review.findOne({
    product: payload.productId,
    user: userId,
    order: payload.orderId,
  });

  if (existingReview) {
    throw new Error("You have already reviewed this product for this order");
  }

  const review = await Review.create({
    product: payload.productId,
    user: userId,
    order: payload.orderId,
    rating: payload.rating,
    comment: payload.comment,
    isApproved: false,
  });

  return Review.findById(review._id)
    .populate("product", "name price images")
    .populate("user", "name")
    .populate("order", "totalAmount orderStatus");
};

const getProductReviews = async (productId: string) => {
  const reviews = await Review.find({
    product: productId,
    isApproved: true,
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  return reviews;
};

const getMyReviews = async (userId: string) => {
  const reviews = await Review.find({
    user: userId,
  })
    .populate("product", "name price images")
    .populate("order", "totalAmount orderStatus")
    .sort({ createdAt: -1 });

  return reviews;
};

const updateReview = async (
  reviewId: string,
  userId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await Review.findOne({
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

  return Review.findById(review._id)
    .populate("product", "name price images")
    .populate("user", "name")
    .populate("order", "totalAmount orderStatus");
};

const deleteReview = async (
  reviewId: string,
  userId: string
) => {
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: userId,
  });

  return review;
};

const getAllReviews = async () => {
  const reviews = await Review.find()
    .populate("product", "name price images")
    .populate("user", "name email")
    .populate("order", "totalAmount orderStatus")
    .sort({ createdAt: -1 });

  return reviews;
};

const updateReviewApproval = async (
  reviewId: string,
  isApproved: boolean
) => {
  const review = await Review.findByIdAndUpdate(
    reviewId,
    {
      isApproved,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("product", "name price images")
    .populate("user", "name email")
    .populate("order", "totalAmount orderStatus");

  return review;
};

export const reviewService = {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getAllReviews,
  updateReviewApproval,
};