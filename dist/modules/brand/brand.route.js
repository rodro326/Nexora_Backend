"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const brand_controller_1 = require("./brand.controller");
const brand_validation_1 = require("./brand.validation");
const router = express_1.default.Router();
// Public routes
router.get("/", brand_controller_1.brandController.getAllBrands);
router.get("/:brandId", brand_controller_1.brandController.getBrandById);
// Admin routes
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(brand_validation_1.createBrandValidationSchema), brand_controller_1.brandController.createBrand);
router.patch("/:brandId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(brand_validation_1.updateBrandValidationSchema), brand_controller_1.brandController.updateBrand);
router.delete("/:brandId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), brand_controller_1.brandController.deleteBrand);
exports.default = router;
//# sourceMappingURL=brand.route.js.map