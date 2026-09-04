import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { withdrawalService } from "./withdrawal.service";

const createWithdrawal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const withdrawal =
      await withdrawalService.createWithdrawal(
        req.user.userId,
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Withdrawal request created successfully",
      data: withdrawal,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create withdrawal request",
    });
  }
};

const getMyWithdrawals = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const withdrawals =
      await withdrawalService.getMyWithdrawals(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      message: "Withdrawals retrieved successfully",
      data: withdrawals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve withdrawals",
    });
  }
};

const getWithdrawalById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const withdrawal =
      await withdrawalService.getWithdrawalById(
        String(req.params.withdrawalId),
        req.user.userId
      );

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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve withdrawal",
    });
  }
};

const getAllWithdrawals = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const withdrawals =
      await withdrawalService.getAllWithdrawals();

    return res.status(200).json({
      success: true,
      message: "All withdrawals retrieved successfully",
      data: withdrawals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve withdrawals",
    });
  }
};

const updateWithdrawalStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const withdrawal =
      await withdrawalService.updateWithdrawalStatus(
        String(req.params.withdrawalId),
        req.body
      );

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
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update withdrawal status",
    });
  }
};

const deleteWithdrawal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const withdrawal =
      await withdrawalService.deleteWithdrawal(
        String(req.params.withdrawalId),
        req.user.userId
      );

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message:
          "Withdrawal not found or cannot be deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Withdrawal deleted successfully",
      data: withdrawal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete withdrawal",
    });
  }
};

export const withdrawalController = {
  createWithdrawal,
  getMyWithdrawals,
  getWithdrawalById,
  getAllWithdrawals,
  updateWithdrawalStatus,
  deleteWithdrawal,
};