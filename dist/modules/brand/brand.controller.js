"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandController = void 0;
const brand_service_1 = require("./brand.service");
const createBrand = async (req, res) => {
    try {
        const brand = await brand_service_1.brandService.createBrand(req.body);
        res.status(201).json({
            success: true,
            message: "Brand created successfully",
            data: brand,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Brand creation failed",
        });
    }
};
const getAllBrands = async (req, res) => {
    try {
        const brands = await brand_service_1.brandService.getAllBrands();
        res.status(200).json({
            success: true,
            message: "Brands retrieved successfully",
            data: brands,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve brands",
        });
    }
};
const getBrandById = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brand = await brand_service_1.brandService.getBrandById(brandId);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Brand retrieved successfully",
            data: brand,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve brand",
        });
    }
};
const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brand = await brand_service_1.brandService.updateBrand(brandId, req.body);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Brand updated successfully",
            data: brand,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Brand update failed",
        });
    }
};
const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brand = await brand_service_1.brandService.deleteBrand(brandId);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Brand deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Brand deletion failed",
        });
    }
};
exports.brandController = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
};
//# sourceMappingURL=brand.controller.js.map