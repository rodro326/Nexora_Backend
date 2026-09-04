"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Order is required"],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    amount: {
        type: Number,
        required: [true, "Payment amount is required"],
        min: [0, "Payment amount cannot be negative"],
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "card", "online"],
        required: [true, "Payment method is required"],
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
    },
    transactionId: {
        type: String,
        trim: true,
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Payment = (0, mongoose_1.model)("Payment", paymentSchema);
exports.default = Payment;
//# sourceMappingURL=payment.model.js.map