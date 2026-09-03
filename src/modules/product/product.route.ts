import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { productController } from "./product.controller";
import { createProductValidationSchema } from "./product.validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("vendor"),
  validationMiddleware(createProductValidationSchema),
  productController.createProduct
);

export default router;