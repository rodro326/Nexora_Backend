"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const withdrawalSchema = new mongoose_1.Schema({
    vendor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Vendor is required"],
    },
    amount: {
        type: Number,
        required: [true, "Withdrawal amount is required"],
        min: [1, "Withdrawal amount must be greater than 0"],
    },
    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "rejected",
            "processed",
        ],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["bank", "mobile_banking"],
        required: [true, "Payment method is required"],
    },
    accountNumber: {
        type: String,
        required: [true, "Account number is required"],
        trim: true,
    },
    note: {
        type: String,
        trim: true,
        maxlength: [
            500,
            "Note cannot exceed 500 characters",
        ],
    },
    processedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Withdrawal = (0, mongoose_1.model)("Withdrawal", withdrawalSchema);
exports.default = Withdrawal;
//# sourceMappingURL=withdrawal.model.js.map