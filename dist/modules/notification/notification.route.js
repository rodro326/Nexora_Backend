"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const notification_controller_1 = require("./notification.controller");
const notification_validation_1 = require("./notification.validation");
const router = express_1.default.Router();
// Admin can create notification for a user
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(notification_validation_1.createNotificationValidationSchema), notification_controller_1.notificationController.createNotification);
// Customer can view own notifications
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), notification_controller_1.notificationController.getMyNotifications);
// Customer can mark all notifications as read
router.patch("/read-all", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), notification_controller_1.notificationController.markAllAsRead);
// Customer can mark one notification as read
router.patch("/:notificationId/read", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), notification_controller_1.notificationController.markAsRead);
// Customer can delete own notification
router.delete("/:notificationId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), notification_controller_1.notificationController.deleteNotification);
exports.default = router;
//# sourceMappingURL=notification.route.js.map