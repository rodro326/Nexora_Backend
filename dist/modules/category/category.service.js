"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategory = async (payload) => {
    const existingCategory = await category_model_1.default.findOne({
        $or: [
            { name: payload.name },
            { slug: payload.slug.toLowerCase() },
        ],
    });
    if (existingCategory) {
        throw new Error("Category with this name or slug already exists");
    }
    const category = await category_model_1.default.create({
        ...payload,
        slug: payload.slug.toLowerCase(),
    });
    return category;
};
const getAllCategories = async () => {
    const categories = await category_model_1.default.find().sort({ createdAt: -1 });
    return categories;
};
const getCategoryById = async (categoryId) => {
    const category = await category_model_1.default.findById(categoryId);
    return category;
};
const updateCategory = async (categoryId, payload) => {
    const category = await category_model_1.default.findByIdAndUpdate(categoryId, {
        ...payload,
        ...(payload.slug && { slug: payload.slug.toLowerCase() }),
    }, {
        new: true,
        runValidators: true,
    });
    return category;
};
const deleteCategory = async (categoryId) => {
    const category = await category_model_1.default.findByIdAndDelete(categoryId);
    return category;
};
exports.categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.service.js.map