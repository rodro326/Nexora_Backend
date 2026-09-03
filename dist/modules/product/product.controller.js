"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createProduct = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const product = await product_service_1.productService.createProduct(req.body, req.user.userId);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Product creation failed",
        });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await product_service_1.productService.getAllProducts();
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve products",
        });
    }
};
const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await product_service_1.productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve product",
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const productId = req.params.productId;
        const product = await product_service_1.productService.updateProduct(productId, req.user.userId, req.body);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found or you do not own this product",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Product update failed",
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const productId = req.params.productId;
        const product = await product_service_1.productService.deleteProduct(productId, req.user.userId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found or you do not own this product",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Product deletion failed",
        });
    }
};
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map