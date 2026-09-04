"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiChatValidationSchema = void 0;
const zod_1 = require("zod");
exports.aiChatValidationSchema = zod_1.z.object({
    message: zod_1.z
        .string()
        .min(1, "Message is required")
        .max(2000, "Message cannot exceed 2000 characters"),
});
//# sourceMappingURL=ai.validation.js.map