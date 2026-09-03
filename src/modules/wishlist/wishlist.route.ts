import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { wishlistController } from "./wishlist.controller";
import {
  addToWishlistValidationSchema,
  removeFromWishlistValidationSchema,
} from "./wishlist.validation";

const router = express.Router();

// Get wishlist
router.get(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  wishlistController.getWishlist
);

// Add product to wishlist
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(addToWishlistValidationSchema),
  wishlistController.addToWishlist
);

// Remove product from wishlist
router.delete(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(removeFromWishlistValidationSchema),
  wishlistController.removeFromWishlist
);

// Clear wishlist
router.delete(
  "/clear",
  authMiddleware,
  roleMiddleware("customer"),
  wishlistController.clearWishlist
);

export default router;