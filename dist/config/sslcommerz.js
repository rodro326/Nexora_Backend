"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const storeId = process.env.SSLCOMMERZ_STORE_ID;
const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
console.log("SSL Store ID loaded:", !!storeId);
console.log("SSL Store Password loaded:", !!storePassword);
if (!storeId || !storePassword) {
    throw new Error("SSLCommerz credentials are missing");
}
const sslcommerzConfig = {
    storeId,
    storePassword,
    isLive: process.env.SSLCOMMERZ_IS_LIVE === "true",
};
exports.default = sslcommerzConfig;
//# sourceMappingURL=sslcommerz.js.map