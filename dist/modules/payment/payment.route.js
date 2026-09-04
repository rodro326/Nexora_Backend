"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const payment_controller_1 = require("./payment.controller");
const payment_validation_1 = require("./payment.validation");
const router = express_1.default.Router();
// Customer: Create payment
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(payment_validation_1.createPaymentValidationSchema), payment_controller_1.paymentController.createPayment);
// Customer: Get my payments
router.get("/my", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), payment_controller_1.paymentController.getMyPayments);
// Customer: Get payment by order
router.get("/order/:orderId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), payment_controller_1.paymentController.getPaymentByOrder);
// Admin: Get all payments
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), payment_controller_1.paymentController.getAllPayments);
// Admin: Update payment status
router.patch("/:paymentId/status", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(payment_validation_1.updatePaymentStatusValidationSchema), payment_controller_1.paymentController.updatePaymentStatus);
exports.default = router;
//# sourceMappingURL=payment.route.js.map