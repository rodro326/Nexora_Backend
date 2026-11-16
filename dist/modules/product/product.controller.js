"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_image_service_1 = require("./product-image.service");
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
const getVendorProducts = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const products = await product_service_1.productService.getProductsByVendor(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Vendor products retrieved successfully",
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve vendor products",
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
const uploadProductImage = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image to upload",
            });
        }
        const imageUrl = await product_image_service_1.productImageService.uploadProductImage(req.file);
        return res.status(200).json({
            success: true,
            message: "Product image uploaded successfully",
            data: {
                imageUrl,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Image upload failed",
        });
    }
};
// Keep your existing createProduct, getAllProducts,
// getProductById, updateProduct and deleteProduct functions unchanged.
exports.productController = {
    createProduct,
    getAllProducts,
    getVendorProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProductImage,
};
//# sourceMappingURL=product.controller.js.map