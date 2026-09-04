"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const coupon_controller_1 = require("./coupon.controller");
const coupon_validation_1 = require("./coupon.validation");
const router = express_1.default.Router();
// Admin: Create coupon
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(coupon_validation_1.createCouponValidationSchema), coupon_controller_1.couponController.createCoupon);
// Customer: Apply coupon
router.post("/apply", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(coupon_validation_1.applyCouponValidationSchema), coupon_controller_1.couponController.applyCoupon);
// Admin: Get all coupons
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), coupon_controller_1.couponController.getAllCoupons);
// Admin: Get coupon by ID
router.get("/:couponId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), coupon_controller_1.couponController.getCouponById);
// Admin: Update coupon
router.patch("/:couponId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(coupon_validation_1.updateCouponValidationSchema), coupon_controller_1.couponController.updateCoupon);
// Admin: Delete coupon
router.delete("/:couponId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), coupon_controller_1.couponController.deleteCoupon);
// Admin: Increment coupon usage
router.patch("/:couponId/usage", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), coupon_controller_1.couponController.incrementCouponUsage);
exports.default = router;
//# sourceMappingURL=coupon.route.js.map