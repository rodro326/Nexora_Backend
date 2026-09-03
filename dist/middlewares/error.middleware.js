"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map