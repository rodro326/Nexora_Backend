"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationReadValidationSchema = exports.createNotificationValidationSchema = void 0;
const zod_1 = require("zod");
exports.createNotificationValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    title: zod_1.z.string().min(2).max(100),
    message: zod_1.z.string().min(2).max(500),
    type: zod_1.z.enum([
        "order",
        "payment",
        "shipping",
        "promotion",
        "system",
    ]),
});
exports.markNotificationReadValidationSchema = zod_1.z.object({
    notificationId: zod_1.z.string().min(1, "Notification ID is required"),
});
//# sourceMappingURL=notification.validation.js.map