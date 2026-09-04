"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const getAllUsers = async () => {
    const users = await user_model_1.default.find().select("-password");
    return users;
};
const getUserById = async (userId) => {
    const user = await user_model_1.default.findById(userId).select("-password");
    return user;
};
const updateMyProfile = async (userId, payload) => {
    const user = await user_model_1.default.findByIdAndUpdate(userId, {
        $set: payload,
    }, {
        returnDocument: "after",
        runValidators: true,
    }).select("-password");
    return user;
};
exports.userService = {
    getAllUsers,
    getUserById,
    updateMyProfile,
};
//# sourceMappingURL=user.service.js.map