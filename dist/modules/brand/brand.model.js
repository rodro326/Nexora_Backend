"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        minlength: [2, "Brand name must be at least 2 characters"],
        maxlength: [100, "Brand name cannot exceed 100 characters"],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, "Brand slug is required"],
        trim: true,
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    logo: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Brand = (0, mongoose_1.model)("Brand", brandSchema);
exports.default = Brand;
//# sourceMappingURL=brand.model.js.map