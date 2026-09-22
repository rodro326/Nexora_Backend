"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayment = exports.initiatePayment = exports.sslcommerz = void 0;
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const sslcommerz_1 = __importDefault(require("../../config/sslcommerz"));
const sslcommerz = new sslcommerz_lts_1.default(sslcommerz_1.default.storeId, sslcommerz_1.default.storePassword, sslcommerz_1.default.isLive);
exports.sslcommerz = sslcommerz;
const initiatePayment = async (payload) => {
    const data = {
        total_amount: payload.totalAmount,
        currency: "BDT",
        tran_id: payload.transactionId,
        success_url: "http://localhost:5001/api/payments/sslcommerz/success",
        fail_url: "http://localhost:5001/api/payments/sslcommerz/fail",
        cancel_url: "http://localhost:5001/api/payments/sslcommerz/cancel",
        ipn_url: "http://localhost:5001/api/payments/sslcommerz/ipn",
        shipping_method: "NO",
        product_name: "Nexora Electronics",
        product_category: "Electronics",
        product_profile: "general",
        cus_name: payload.customerName,
        cus_email: payload.customerEmail,
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: payload.customerPhone,
        ship_name: payload.customerName,
        ship_add1: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };
    const response = await sslcommerz.init(data);
    console.log("SSLCommerz init response:", response);
    return response;
};
exports.initiatePayment = initiatePayment;
const validatePayment = async (valId) => {
    const response = await sslcommerz.validate({
        val_id: valId,
    });
    return response;
};
exports.validatePayment = validatePayment;
//# sourceMappingURL=sslcommerz.service.js.map