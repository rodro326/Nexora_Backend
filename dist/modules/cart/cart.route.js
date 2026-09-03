"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const cart_controller_1 = require("./cart.controller");
const cart_validation_1 = require("./cart.validation");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), cart_controller_1.cartController.getCart);
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(cart_validation_1.addToCartValidationSchema), cart_controller_1.cartController.addToCart);
router.patch("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(cart_validation_1.updateCartItemValidationSchema), cart_controller_1.cartController.updateCartItem);
router.delete("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(cart_validation_1.removeFromCartValidationSchema), cart_controller_1.cartController.removeFromCart);
router.delete("/clear", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), cart_controller_1.cartController.clearCart);
exports.default = router;
//# sourceMappingURL=cart.route.js.map