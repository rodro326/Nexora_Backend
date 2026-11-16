import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { orderController } from "./order.controller";
import {
  createOrderValidationSchema,
  updateOrderStatusValidationSchema,
  updatePaymentStatusValidationSchema,
  updateVendorItemStatusValidationSchema,
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
router.patch(
  "/vendor/:orderId/items/:productId/status",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(updateVendorItemStatusValidationSchema),
  orderController.updateVendorItemStatus
);
// Vendor: Get My Orders
router.get(
  "/vendor/my-orders",
  authMiddleware,
  roleMiddleware("vendor"),
  orderController.getVendorOrders
);

// Vendor: Get Sales Analytics Report
router.get(
  "/vendor/sales-report",
  authMiddleware,
  roleMiddleware("vendor"),
  orderController.getVendorSalesReport
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