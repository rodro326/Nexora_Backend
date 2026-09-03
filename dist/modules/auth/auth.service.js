"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const registerUser = async (payload) => {
    const existingUser = await user_model_1.default.findOne({
        email: payload.email.toLowerCase(),
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(payload.password, 10);
    const user = await user_model_1.default.create({
        name: payload.name,
        email: payload.email.toLowerCase(),
        password: hashedPassword,
        phone: payload.phone,
        role: payload.role || "customer",
    });
    const { password, ...userObject } = user.toObject();
    return userObject;
};
const loginUser = async (payload) => {
    const user = await user_model_1.default.findOne({
        email: payload.email.toLowerCase(),
    }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordMatched = await bcryptjs_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }
    const { password, ...userObject } = user.toObject();
    const token = (0, jwt_1.default)({
        userId: user._id.toString(),
        role: user.role,
    });
    return {
        user: userObject,
        token,
    };
};
exports.authService = {
    registerUser,
    loginUser,
};
//# sourceMappingURL=auth.service.js.map