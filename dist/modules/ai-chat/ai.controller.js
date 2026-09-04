"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiChatController = void 0;
const ai_service_1 = require("./ai.service");
const sendMessage = async (req, res) => {
    try {
        const result = await ai_service_1.aiChatService.sendMessage(req.body);
        res.status(200).json({
            success: true,
            message: "AI response generated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate AI response",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.aiChatController = {
    sendMessage,
};
//# sourceMappingURL=ai.controller.js.map