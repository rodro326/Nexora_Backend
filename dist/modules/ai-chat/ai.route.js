"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const ai_controller_1 = require("./ai.controller");
const ai_validation_1 = require("./ai.validation");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.default, (0, validation_middleware_1.default)(ai_validation_1.aiChatValidationSchema), ai_controller_1.aiChatController.sendMessage);
exports.default = router;
//# sourceMappingURL=ai.route.js.map