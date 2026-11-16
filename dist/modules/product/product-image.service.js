"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productImageService = void 0;
const stream_1 = require("stream");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const uploadProductImage = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder: "nexora/products",
            resource_type: "image",
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            if (!result?.secure_url) {
                reject(new Error("Cloudinary image upload failed."));
                return;
            }
            resolve(result.secure_url);
        });
        stream_1.Readable.from(file.buffer).pipe(uploadStream);
    });
};
exports.productImageService = {
    uploadProductImage,
};
//# sourceMappingURL=product-image.service.js.map