import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { orderController } from "./order.controller";
import {
  createOrderValidationSchema,
  updateOrderStatusValidationSchema,
  updatePaymentStatusValidationSchema,
} from "./order.validation";

const router = express.Router();

// Customer: Create Order
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(createOrderValidationSchema),
  orderController.createOrder
);

// Customer: Get My Orders
router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("customer"),
  orderController.getMyOrders
);

// Customer: Get Single Order
router.get(
  "/:orderId",
  authMiddleware,
  roleMiddleware("customer"),
  orderController.getOrderById
);

// Admin: Update Order Status
router.patch(
  "/:orderId/status",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updateOrderStatusValidationSchema),
  orderController.updateOrderStatus
);

// Admin: Update Payment Status
router.patch(
  "/:orderId/payment-status",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updatePaymentStatusValidationSchema),
  orderController.updatePaymentStatus
);

export default router;