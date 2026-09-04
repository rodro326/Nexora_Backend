import Withdrawal from "./withdrawal.model";

const createWithdrawal = async (
  vendorId: string,
  payload: {
    amount: number;
    paymentMethod: "bank" | "mobile_banking";
    accountNumber: string;
    note?: string;
  }
) => {
  const withdrawal = await Withdrawal.create({
    vendor: vendorId,
    amount: payload.amount,
    paymentMethod: payload.paymentMethod,
    accountNumber: payload.accountNumber,
    note: payload.note,
    status: "pending",
  });

  return Withdrawal.findById(withdrawal._id).populate(
    "vendor",
    "name email"
  );
};

const getMyWithdrawals = async (vendorId: string) => {
  const withdrawals = await Withdrawal.find({
    vendor: vendorId,
  })
    .populate("vendor", "name email")
    .sort({ createdAt: -1 });

  return withdrawals;
};

const getWithdrawalById = async (
  withdrawalId: string,
  vendorId: string
) => {
  const withdrawal = await Withdrawal.findOne({
    _id: withdrawalId,
    vendor: vendorId,
  }).populate("vendor", "name email");

  return withdrawal;
};

const getAllWithdrawals = async () => {
  const withdrawals = await Withdrawal.find()
    .populate("vendor", "name email")
    .sort({ createdAt: -1 });

  return withdrawals;
};

const updateWithdrawalStatus = async (
  withdrawalId: string,
  payload: {
    status:
      | "pending"
      | "approved"
      | "rejected"
      | "processed";
  }
) => {
  const withdrawal = await Withdrawal.findById(
    withdrawalId
  );

  if (!withdrawal) {
    return null;
  }

  withdrawal.status = payload.status;

  if (payload.status === "processed") {
    withdrawal.processedAt = new Date();
  }

  await withdrawal.save();

  return Withdrawal.findById(withdrawal._id).populate(
    "vendor",
    "name email"
  );
};

const deleteWithdrawal = async (
  withdrawalId: string,
  vendorId: string
) => {
  const withdrawal = await Withdrawal.findOneAndDelete({
    _id: withdrawalId,
    vendor: vendorId,
    status: "pending",
  });

  return withdrawal;
};

export const withdrawalService = {
  createWithdrawal,
  getMyWithdrawals,
  getWithdrawalById,
  getAllWithdrawals,
  updateWithdrawalStatus,
  deleteWithdrawal,
};