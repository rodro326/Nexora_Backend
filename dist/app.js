"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
const category_route_1 = __importDefault(require("./modules/category/category.route"));
const brand_route_1 = __importDefault(require("./modules/brand/brand.route"));
const cart_route_1 = __importDefault(require("./modules/cart/cart.route"));
const wishlist_route_1 = __importDefault(require("./modules/wishlist/wishlist.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/products", product_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/brands", brand_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/wishlist", wishlist_route_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Nexora Backend!");
});
app.use(error_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map