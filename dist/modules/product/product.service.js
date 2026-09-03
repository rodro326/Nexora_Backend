"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProduct = async (payload, vendorId) => {
    const product = await product_model_1.default.create({
        ...payload,
        vendor: vendorId,
    });
    return product;
};
exports.productService = {
    createProduct,
};
//# sourceMappingURL=product.service.js.map