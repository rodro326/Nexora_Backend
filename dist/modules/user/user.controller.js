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
exports.userController = {
    getAllUsers,
    getUserById,
};
//# sourceMappingURL=user.controller.js.map