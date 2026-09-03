import express from "express";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import errorMiddleware from "./middlewares/error.middleware";
import productRoute from "./modules/product/product.route";
import categoryRoute from "./modules/category/category.route";
import brandRoute from "./modules/brand/brand.route";

const app = express();

app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/brands", brandRoute);


app.get("/", (req, res) => {
  res.send("Welcome to Nexora Backend!");
});

app.use(errorMiddleware);
export default app;