"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const product_controller_1 = require("./product.controller");
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.post("/upload-image", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), upload_middleware_1.default.single("image"), product_controller_1.productController.uploadProductImage);
router.get("/vendor/my-products", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), product_controller_1.productController.getVendorProducts);
// Public routes
router.get("/", product_controller_1.productController.getAllProducts);
router.get("/:productId", product_controller_1.productController.getProductById);
// Vendor routes
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), (0, validation_middleware_1.default)(product_validation_1.createProductValidationSchema), product_controller_1.productController.createProduct);
router.patch("/:productId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), (0, validation_middleware_1.default)(product_validation_1.updateProductValidationSchema), product_controller_1.productController.updateProduct);
router.delete("/:productId", auth_middleware_1.default, (0, role_middleware_1.default)("vendor"), product_controller_1.productController.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.route.js.map