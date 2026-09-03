"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [2, "Product name must be at least 2 characters"],
        maxlength: [150, "Product name cannot exceed 150 characters"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0,
    },
    images: {
        type: [String],
        default: [],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Brand",
        required: [true, "Brand is required"],
    },
    vendor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Vendor is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map