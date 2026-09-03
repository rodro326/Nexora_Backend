"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const createCategory = async (req, res) => {
    try {
        const category = await category_service_1.categoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Category creation failed",
        });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const categories = await category_service_1.categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve categories",
        });
    }
};
const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await category_service_1.categoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: category,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to retrieve category",
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await category_service_1.categoryService.updateCategory(categoryId, req.body);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Category update failed",
        });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await category_service_1.categoryService.deleteCategory(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Category deletion failed",
        });
    }
};
exports.categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map