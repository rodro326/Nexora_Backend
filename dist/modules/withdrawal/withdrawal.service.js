"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalService = void 0;
const withdrawal_model_1 = __importDefault(require("./withdrawal.model"));
const createWithdrawal = async (vendorId, payload) => {
    const withdrawal = await withdrawal_model_1.default.create({
        vendor: vendorId,
        amount: payload.amount,
        paymentMethod: payload.paymentMethod,
        accountNumber: payload.accountNumber,
        note: payload.note,
        status: "pending",
    });
    return withdrawal_model_1.default.findById(withdrawal._id).populate("vendor", "name email");
};
const getMyWithdrawals = async (vendorId) => {
    const withdrawals = await withdrawal_model_1.default.find({
        vendor: vendorId,
    })
        .populate("vendor", "name email")
        .sort({ createdAt: -1 });
    return withdrawals;
};
const getWithdrawalById = async (withdrawalId, vendorId) => {
    const withdrawal = await withdrawal_model_1.default.findOne({
        _id: withdrawalId,
        vendor: vendorId,
    }).populate("vendor", "name email");
    return withdrawal;
};
const getAllWithdrawals = async () => {
    const withdrawals = await withdrawal_model_1.default.find()
        .populate("vendor", "name email")
        .sort({ createdAt: -1 });
    return withdrawals;
};
const updateWithdrawalStatus = async (withdrawalId, payload) => {
    const withdrawal = await withdrawal_model_1.default.findById(withdrawalId);
    if (!withdrawal) {
        return null;
    }
    withdrawal.status = payload.status;
    if (payload.status === "processed") {
        withdrawal.processedAt = new Date();
    }
    await withdrawal.save();
    return withdrawal_model_1.default.findById(withdrawal._id).populate("vendor", "name email");
};
const deleteWithdrawal = async (withdrawalId, vendorId) => {
    const withdrawal = await withdrawal_model_1.default.findOneAndDelete({
        _id: withdrawalId,
        vendor: vendorId,
        status: "pending",
    });
    return withdrawal;
};
exports.withdrawalService = {
    createWithdrawal,
    getMyWithdrawals,
    getWithdrawalById,
    getAllWithdrawals,
    updateWithdrawalStatus,
    deleteWithdrawal,
};
//# sourceMappingURL=withdrawal.service.js.map