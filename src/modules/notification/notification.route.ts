import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { notificationController } from "./notification.controller";

import {
  createNotificationValidationSchema,
} from "./notification.validation";

const router = express.Router();

// Admin can create notification for a user
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(createNotificationValidationSchema),
  notificationController.createNotification
);

// Customer can view own notifications
router.get(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  notificationController.getMyNotifications
);

// Customer can mark all notifications as read
router.patch(
  "/read-all",
  authMiddleware,
  roleMiddleware("customer"),
  notificationController.markAllAsRead
);

// Customer can mark one notification as read
router.patch(
  "/:notificationId/read",
  authMiddleware,
  roleMiddleware("customer"),
  notificationController.markAsRead
);

// Customer can delete own notification
router.delete(
  "/:notificationId",
  authMiddleware,
  roleMiddleware("customer"),
  notificationController.deleteNotification
);

export default router;