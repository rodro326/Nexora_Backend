"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const registerUser = async (req, res) => {
    try {
        const user = await auth_service_1.authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Registration failed",
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const user = await auth_service_1.authService.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Login failed",
        });
    }
};
exports.authController = {
    registerUser,
    loginUser,
};
//# sourceMappingURL=auth.controller.js.map