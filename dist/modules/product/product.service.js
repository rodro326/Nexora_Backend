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
const getAllProducts = async () => {
    const products = await product_model_1.default.find()
        .populate("category", "name slug")
        .populate("brand", "name slug")
        .sort({ createdAt: -1 });
    return products;
};
const getProductById = async (productId) => {
    const product = await product_model_1.default.findById(productId)
        .populate("category", "name slug")
        .populate("brand", "name slug");
    return product;
};
const updateProduct = async (productId, vendorId, payload) => {
    const product = await product_model_1.default.findOneAndUpdate({
        _id: productId,
        vendor: vendorId,
    }, payload, {
        new: true,
        runValidators: true,
    });
    return product;
};
const deleteProduct = async (productId, vendorId) => {
    const product = await product_model_1.default.findOneAndDelete({
        _id: productId,
        vendor: vendorId,
    });
    return product;
};
exports.productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.service.js.map