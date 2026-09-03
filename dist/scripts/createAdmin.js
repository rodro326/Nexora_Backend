"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
dotenv_1.default.config();
const createAdmin = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in .env");
        }
        await mongoose_1.default.connect(mongoURI);
        const adminEmail = "admin@nexora.com";
        const adminPassword = "Admin@123456";
        const existingAdmin = await user_model_1.default.findOne({
            email: adminEmail,
        });
        if (existingAdmin) {
            console.log("Admin already exists!");
            await mongoose_1.default.disconnect();
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(adminPassword, 10);
        await user_model_1.default.create({
            name: "Nexora Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            isActive: true,
        });
        console.log("Admin created successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error("Admin creation failed:", error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
};
createAdmin();
//# sourceMappingURL=createAdmin.js.map