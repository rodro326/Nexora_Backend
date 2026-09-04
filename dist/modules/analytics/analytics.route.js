"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const analytics_controller_1 = require("./analytics.controller");
const router = express_1.default.Router();
// Admin analytics
router.get("/admin", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), analytics_controller_1.analyticsController.getAdminAnalytics);
// Vendor analytics
router.get("/vendor", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), analytics_controller_1.analyticsController.getVendorAnalytics);
exports.default = router;
//# sourceMappingURL=analytics.route.js.map