"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const inventory_controller_1 = require("./inventory.controller");
const inventory_validation_1 = require("./inventory.validation");
const router = express_1.default.Router();
// Create inventory
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), (0, validation_middleware_1.default)(inventory_validation_1.createInventoryValidationSchema), inventory_controller_1.inventoryController.createInventory);
// Get low stock inventory
router.get("/low-stock", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), inventory_controller_1.inventoryController.getLowStockInventory);
// Get all my inventory
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), inventory_controller_1.inventoryController.getMyInventory);
// Get inventory by product
router.get("/product/:productId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), inventory_controller_1.inventoryController.getInventoryByProduct);
// Update inventory
router.patch("/product/:productId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), (0, validation_middleware_1.default)(inventory_validation_1.updateInventoryValidationSchema), inventory_controller_1.inventoryController.updateInventory);
// Delete inventory
router.delete("/product/:productId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), inventory_controller_1.inventoryController.deleteInventory);
exports.default = router;
//# sourceMappingURL=inventory.route.js.map