"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalController = void 0;
const withdrawal_service_1 = require("./withdrawal.service");
const createWithdrawal = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const withdrawal = await withdrawal_service_1.withdrawalService.createWithdrawal(req.user.userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Withdrawal request created successfully",
            data: withdrawal,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create withdrawal request",
        });
    }
};
const getMyWithdrawals = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const withdrawals = await withdrawal_service_1.withdrawalService.getMyWithdrawals(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Withdrawals retrieved successfully",
            data: withdrawals,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve withdrawals",
        });
    }
};
const getWithdrawalById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const withdrawal = await withdrawal_service_1.withdrawalService.getWithdrawalById(String(req.params.withdrawalId), req.user.userId);
        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                message: "Withdrawal not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Withdrawal retrieved successfully",
            data: withdrawal,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve withdrawal",
        });
    }
};
const getAllWithdrawals = async (req, res) => {
    try {
        const withdrawals = await withdrawal_service_1.withdrawalService.getAllWithdrawals();
        return res.status(200).json({
            success: true,
            message: "All withdrawals retrieved successfully",
            data: withdrawals,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve withdrawals",
        });
    }
};
const updateWithdrawalStatus = async (req, res) => {
    try {
        const withdrawal = await withdrawal_service_1.withdrawalService.updateWithdrawalStatus(String(req.params.withdrawalId), req.body);
        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                message: "Withdrawal not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Withdrawal status updated successfully",
            data: withdrawal,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update withdrawal status",
        });
    }
};
const deleteWithdrawal = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const withdrawal = await withdrawal_service_1.withdrawalService.deleteWithdrawal(String(req.params.withdrawalId), req.user.userId);
        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                message: "Withdrawal not found or cannot be deleted",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Withdrawal deleted successfully",
            data: withdrawal,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete withdrawal",
        });
    }
};
exports.withdrawalController = {
    createWithdrawal,
    getMyWithdrawals,
    getWithdrawalById,
    getAllWithdrawals,
    updateWithdrawalStatus,
    deleteWithdrawal,
};
//# sourceMappingURL=withdrawal.controller.js.map