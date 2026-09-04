"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const address_controller_1 = require("./address.controller");
const address_validation_1 = require("./address.validation");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(address_validation_1.createAddressValidationSchema), address_controller_1.addressController.createAddress);
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), address_controller_1.addressController.getMyAddresses);
router.get("/:addressId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), address_controller_1.addressController.getAddressById);
router.patch("/:addressId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(address_validation_1.updateAddressValidationSchema), address_controller_1.addressController.updateAddress);
router.delete("/:addressId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), address_controller_1.addressController.deleteAddress);
exports.default = router;
//# sourceMappingURL=address.route.js.map