"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const wishlist_controller_1 = require("./wishlist.controller");
const wishlist_validation_1 = require("./wishlist.validation");
const router = express_1.default.Router();
// Get wishlist
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), wishlist_controller_1.wishlistController.getWishlist);
// Add product to wishlist
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(wishlist_validation_1.addToWishlistValidationSchema), wishlist_controller_1.wishlistController.addToWishlist);
// Remove product from wishlist
router.delete("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(wishlist_validation_1.removeFromWishlistValidationSchema), wishlist_controller_1.wishlistController.removeFromWishlist);
// Clear wishlist
router.delete("/clear", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), wishlist_controller_1.wishlistController.clearWishlist);
exports.default = router;
//# sourceMappingURL=wishlist.route.js.map