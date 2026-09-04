"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const inventorySchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
        unique: true,
    },
    vendor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Vendor is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
        default: 0,
    },
    lowStockThreshold: {
        type: Number,
        required: [true, "Low stock threshold is required"],
        min: [0, "Low stock threshold cannot be negative"],
        default: 5,
    },
}, {
    timestamps: true,
});
const Inventory = (0, mongoose_1.model)("Inventory", inventorySchema);
exports.default = Inventory;
//# sourceMappingURL=inventory.model.js.map