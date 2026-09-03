"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/register", (0, validation_middleware_1.default)(auth_validation_1.registerValidationSchema), auth_controller_1.authController.registerUser);
router.post("/login", (0, validation_middleware_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.authController.loginUser);
exports.default = router;
//# sourceMappingURL=auth.route.js.map