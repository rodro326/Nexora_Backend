"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
// Admin analytics
const getAdminAnalytics = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const requestedPeriod = String(req.query.period || "daily");
        if (!["daily", "weekly", "monthly"].includes(requestedPeriod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid period. Use daily, weekly or monthly.",
            });
        }
        const analytics = await analytics_service_1.analyticsService.getAdminAnalytics(requestedPeriod);
        return res.status(200).json({
            success: true,
            message: "Admin analytics retrieved successfully",
            data: analytics,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve admin analytics",
        });
    }
};
// Vendor analytics
const getVendorAnalytics = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const analytics = await analytics_service_1.analyticsService.getVendorAnalytics(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Vendor analytics retrieved successfully",
            data: analytics,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve vendor analytics",
        });
    }
};
exports.analyticsController = {
    getAdminAnalytics,
    getVendorAnalytics,
};
//# sourceMappingURL=analytics.controller.js.map