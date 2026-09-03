import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { categoryController } from "./category.controller";
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "./category.validation";

const router = express.Router();

// Public routes
router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);

// Admin routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(createCategoryValidationSchema),
  categoryController.createCategory
);

router.patch(
  "/:categoryId",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(updateCategoryValidationSchema),
  categoryController.updateCategory
);

router.delete(
  "/:categoryId",
  authMiddleware,
  roleMiddleware("admin"),
  categoryController.deleteCategory
);

export default router;