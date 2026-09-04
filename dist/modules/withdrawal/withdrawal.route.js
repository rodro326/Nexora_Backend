"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const withdrawal_controller_1 = require("./withdrawal.controller");
const withdrawal_validation_1 = require("./withdrawal.validation");
const router = express_1.default.Router();
// Vendor: Create withdrawal request
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), (0, validation_middleware_1.default)(withdrawal_validation_1.createWithdrawalValidationSchema), withdrawal_controller_1.withdrawalController.createWithdrawal);
// Vendor: Get my withdrawals
router.get("/my", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), withdrawal_controller_1.withdrawalController.getMyWithdrawals);
// Admin: Get all withdrawals
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), withdrawal_controller_1.withdrawalController.getAllWithdrawals);
// Vendor: Get own withdrawal by ID
router.get("/:withdrawalId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), withdrawal_controller_1.withdrawalController.getWithdrawalById);
// Admin: Update withdrawal status
router.patch("/:withdrawalId/status", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(withdrawal_validation_1.updateWithdrawalStatusValidationSchema), withdrawal_controller_1.withdrawalController.updateWithdrawalStatus);
// Vendor: Delete own pending withdrawal
router.delete("/:withdrawalId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), withdrawal_controller_1.withdrawalController.deleteWithdrawal);
exports.default = router;
//# sourceMappingURL=withdrawal.route.js.map