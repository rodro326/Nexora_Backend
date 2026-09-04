"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const notification_model_1 = __importDefault(require("./notification.model"));
const createNotification = async (userId, payload) => {
    const notification = await notification_model_1.default.create({
        user: userId,
        ...payload,
        isRead: false,
    });
    return notification;
};
const getMyNotifications = async (userId) => {
    const notifications = await notification_model_1.default.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });
    return notifications;
};
const markAsRead = async (notificationId, userId) => {
    const notification = await notification_model_1.default.findOneAndUpdate({
        _id: notificationId,
        user: userId,
    }, {
        $set: {
            isRead: true,
        },
    }, {
        returnDocument: "after",
        runValidators: true,
    });
    return notification;
};
const markAllAsRead = async (userId) => {
    const result = await notification_model_1.default.updateMany({
        user: userId,
        isRead: false,
    }, {
        $set: {
            isRead: true,
        },
    });
    return result;
};
const deleteNotification = async (notificationId, userId) => {
    const notification = await notification_model_1.default.findOneAndDelete({
        _id: notificationId,
        user: userId,
    });
    return notification;
};
exports.notificationService = {
    createNotification,
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
};
//# sourceMappingURL=notification.service.js.map