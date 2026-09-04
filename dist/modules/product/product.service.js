"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
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
const searchProductsForAI = async (search, maxPrice) => {
    const filter = {
        isActive: true,
    };
    let categoryIds = [];
    if (search) {
        const categories = await category_model_1.default.find({
            name: {
                $regex: search,
                $options: "i",
            },
        }).select("_id");
        categoryIds = categories.map((category) => category._id);
    }
    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                category: {
                    $in: categoryIds,
                },
            },
        ];
    }
    if (maxPrice !== undefined) {
        filter.price = {
            $lte: maxPrice,
        };
    }
    const products = await product_model_1.default.find(filter)
        .populate("category", "name slug")
        .populate("brand", "name slug")
        .sort({ createdAt: -1 })
        .limit(10);
    return products;
};
exports.productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProductsForAI,
};
//# sourceMappingURL=product.service.js.map