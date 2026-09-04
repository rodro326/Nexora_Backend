"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    title: {
        type: String,
        required: [true, "Notification title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    message: {
        type: String,
        required: [true, "Notification message is required"],
        trim: true,
        maxlength: [500, "Message cannot exceed 500 characters"],
    },
    type: {
        type: String,
        enum: [
            "order",
            "payment",
            "shipping",
            "promotion",
            "system",
        ],
        required: [true, "Notification type is required"],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Notification = (0, mongoose_1.model)("Notification", notificationSchema);
exports.default = Notification;
//# sourceMappingURL=notification.model.js.map