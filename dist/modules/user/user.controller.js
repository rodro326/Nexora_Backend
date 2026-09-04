"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    const users = await user_service_1.userService.getAllUsers();
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
    });
};
const updateMyProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const user = await user_service_1.userService.updateMyProfile(req.user.userId, req.body);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update profile",
        });
    }
};
const getUserById = async (req, res) => {
    const userId = req.params.userId;
    const user = await user_service_1.userService.getUserById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
    });
};
const getMyProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const user = await user_service_1.userService.getUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve profile",
        });
    }
};
exports.userController = {
    getAllUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=user.controller.js.map