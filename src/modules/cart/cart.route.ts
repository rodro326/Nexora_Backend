import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { cartController } from "./cart.controller";
import {
  addToCartValidationSchema,
  updateCartItemValidationSchema,
  removeFromCartValidationSchema,
} from "./cart.validation";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  cartController.getCart
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(addToCartValidationSchema),
  cartController.addToCart
);

router.patch(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(updateCartItemValidationSchema),
  cartController.updateCartItem
);

router.delete(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(removeFromCartValidationSchema),
  cartController.removeFromCart
);

router.delete(
  "/clear",
  authMiddleware,
  roleMiddleware("customer"),
  cartController.clearCart
);

export default router;