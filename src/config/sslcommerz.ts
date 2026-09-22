import dotenv from "dotenv";

dotenv.config();

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

export default sslcommerzConfig;