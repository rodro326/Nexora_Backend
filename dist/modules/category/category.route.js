"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
// Public routes
router.get("/", category_controller_1.categoryController.getAllCategories);
router.get("/:categoryId", category_controller_1.categoryController.getCategoryById);
// Admin routes
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(category_validation_1.createCategoryValidationSchema), category_controller_1.categoryController.createCategory);
router.patch("/:categoryId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(category_validation_1.updateCategoryValidationSchema), category_controller_1.categoryController.updateCategory);
router.delete("/:categoryId", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), category_controller_1.categoryController.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.route.js.map