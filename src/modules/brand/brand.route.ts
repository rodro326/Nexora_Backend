import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { brandController } from "./brand.controller";
import {
  createBrandValidationSchema,
  updateBrandValidationSchema,
} from "./brand.validation";

const router = express.Router();

// Public routes
router.get("/", brandController.getAllBrands);
router.get("/:brandId", brandController.getBrandById);

// Admin routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(createBrandValidationSchema),
  brandController.createBrand
);

router.patch(
  "/:brandId",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updateBrandValidationSchema),
  brandController.updateBrand
);

router.delete(
  "/:brandId",
  authMiddleware,
  roleMiddleware("admin"),
  brandController.deleteBrand
);

export default router;