"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        }
        else {
            callback(new Error("Only image files are allowed."));
        }
    },
});
exports.default = upload;
//# sourceMappingURL=upload.middleware.js.map