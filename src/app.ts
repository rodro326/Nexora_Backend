import express from "express";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import errorMiddleware from "./middlewares/error.middleware";
import productRoute from "./modules/product/product.route";
import categoryRoute from "./modules/category/category.route";
import brandRoute from "./modules/brand/brand.route";
import cartRoute from "./modules/cart/cart.route";
import wishlistRoute from "./modules/wishlist/wishlist.route";
import orderRoute from "./modules/order/order.route";
import addressRoute from "./modules/address/address.route";
import notificationRoute from "./modules/notification/notification.route";
import analyticsRoute from "./modules/analytics/analytics.route";
import inventoryRoute from "./modules/inventory/inventory.route";
import paymentRoute from "./modules/payment/payment.route";
import reviewRoute from "./modules/review/review.route";
import couponRoute from "./modules/coupon/coupon.route";
import withdrawalRoute from "./modules/withdrawal/withdrawal.route";

const app = express();

app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/brands", brandRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/orders", orderRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/withdrawals", withdrawalRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Nexora Backend!");
});

app.use(errorMiddleware);
export default app;