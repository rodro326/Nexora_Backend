"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
// Customer: Create Order
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(order_validation_1.createOrderValidationSchema), order_controller_1.orderController.createOrder);
// Customer: Get My Orders
router.get("/my-orders", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), order_controller_1.orderController.getMyOrders);
// Customer: Get Single Order
router.get("/:orderId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), order_controller_1.orderController.getOrderById);
// Admin: Update Order Status
router.patch("/:orderId/status", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(order_validation_1.updateOrderStatusValidationSchema), order_controller_1.orderController.updateOrderStatus);
// Admin: Update Payment Status
router.patch("/:orderId/payment-status", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(order_validation_1.updatePaymentStatusValidationSchema), order_controller_1.orderController.updatePaymentStatus);
exports.default = router;
//# sourceMappingURL=order.route.js.map