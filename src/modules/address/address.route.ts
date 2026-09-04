import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

import { addressController } from "./address.controller";

import {
  createAddressValidationSchema,
  updateAddressValidationSchema,
} from "./address.validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(createAddressValidationSchema),
  addressController.createAddress
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  addressController.getMyAddresses
);

router.get(
  "/:addressId",
  authMiddleware,
  roleMiddleware("customer"),
  addressController.getAddressById
);

router.patch(
  "/:addressId",
  authMiddleware,
  roleMiddleware("customer"),
  validationMiddleware(updateAddressValidationSchema),
  addressController.updateAddress
);

router.delete(
  "/:addressId",
  authMiddleware,
  roleMiddleware("customer"),
  addressController.deleteAddress
);

export default router;