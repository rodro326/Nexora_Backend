"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [2, "Full name must be at least 2 characters"],
        maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Address = (0, mongoose_1.model)("Address", addressSchema);
exports.default = Address;
//# sourceMappingURL=address.model.js.map