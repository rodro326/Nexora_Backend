import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { productController } from "./product.controller";
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

// Vendor routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(createProductValidationSchema),
  productController.createProduct
);

router.patch(
  "/:productId",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(updateProductValidationSchema),
  productController.updateProduct
);

router.delete(
  "/:productId",
  authMiddleware,
  roleMiddleware("vendor"),
  productController.deleteProduct
);

export default router;