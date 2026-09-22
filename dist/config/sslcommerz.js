"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeId = process.env.SSLCOMMERZ_STORE_ID;
const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
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