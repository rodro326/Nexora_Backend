"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandService = void 0;
const brand_model_1 = __importDefault(require("./brand.model"));
const createBrand = async (payload) => {
    const existingBrand = await brand_model_1.default.findOne({
        $or: [
            { name: payload.name },
            { slug: payload.slug.toLowerCase() },
        ],
    });
    if (existingBrand) {
        throw new Error("Brand with this name or slug already exists");
    }
    const brand = await brand_model_1.default.create({
        ...payload,
        slug: payload.slug.toLowerCase(),
    });
    return brand;
};
const getAllBrands = async () => {
    const brands = await brand_model_1.default.find().sort({ createdAt: -1 });
    return brands;
};
const getBrandById = async (brandId) => {
    const brand = await brand_model_1.default.findById(brandId);
    return brand;
};
const updateBrand = async (brandId, payload) => {
    const brand = await brand_model_1.default.findByIdAndUpdate(brandId, {
        ...payload,
        ...(payload.slug && { slug: payload.slug.toLowerCase() }),
    }, {
        new: true,
        runValidators: true,
    });
    return brand;
};
const deleteBrand = async (brandId) => {
    const brand = await brand_model_1.default.findByIdAndDelete(brandId);
    return brand;
};
exports.brandService = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
};
//# sourceMappingURL=brand.service.js.map