import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { inventoryController } from "./inventory.controller";

import {
  createInventoryValidationSchema,
  updateInventoryValidationSchema,
} from "./inventory.validation";

const router = express.Router();

// Create inventory
router.post(
  "/",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(createInventoryValidationSchema),
  inventoryController.createInventory
);

// Get low stock inventory
router.get(
  "/low-stock",
  authMiddleware,
  roleMiddleware("vendor"),
  inventoryController.getLowStockInventory
);

// Get all my inventory
router.get(
  "/",
  authMiddleware,
  roleMiddleware("vendor"),
  inventoryController.getMyInventory
);

// Get inventory by product
router.get(
  "/product/:productId",
  authMiddleware,
  roleMiddleware("vendor"),
  inventoryController.getInventoryByProduct
);

// Update inventory
router.patch(
  "/product/:productId",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(updateInventoryValidationSchema),
  inventoryController.updateInventory
);

// Delete inventory
router.delete(
  "/product/:productId",
  authMiddleware,
  roleMiddleware("vendor"),
  inventoryController.deleteInventory
);

export default router;