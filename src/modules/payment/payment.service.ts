import Payment from "./payment.model";
import Order from "../order/order.model";

const createPayment = async (
  userId: string,
  payload: {
    orderId: string;
    amount: number;
    paymentMethod: "cod" | "card" | "online";
    transactionId?: string;
  }
) => {
  const order = await Order.findOne({
    _id: payload.orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found or does not belong to this customer");
  }

  if (order.totalAmount !== payload.amount) {
    throw new Error("Payment amount does not match order total");
  }

  const existingPayment = await Payment.findOne({
    order: payload.orderId,
  });

  if (existingPayment) {
    throw new Error("Payment already exists for this order");
  }

  const payment = await Payment.create({
    order: payload.orderId,
    user: userId,
    amount: payload.amount,
    paymentMethod: payload.paymentMethod,
    paymentStatus:
      payload.paymentMethod === "cod" ? "pending" : "paid",
    transactionId: payload.transactionId,
    paidAt:
      payload.paymentMethod === "cod"
        ? undefined
        : new Date(),
  });

  if (payment.paymentStatus === "paid") {
    await Order.findByIdAndUpdate(payload.orderId, {
      paymentStatus: "paid",
    });
  }

  return payment;
};

const getMyPayments = async (userId: string) => {
  const payments = await Payment.find({
    user: userId,
  })
    .populate("order", "totalAmount orderStatus paymentMethod")
    .sort({ createdAt: -1 });

  return payments;
};

const getPaymentByOrder = async (
  orderId: string,
  userId: string
) => {
  const payment = await Payment.findOne({
    order: orderId,
    user: userId,
  }).populate(
    "order",
    "totalAmount orderStatus paymentMethod"
  );

  return payment;
};

const updatePaymentStatus = async (
  paymentId: string,
  payload: {
    paymentStatus:
      | "pending"
      | "paid"
      | "failed"
      | "refunded";
    transactionId?: string;
  }
) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    return null;
  }

  payment.paymentStatus = payload.paymentStatus;

  if (payload.transactionId !== undefined) {
    payment.transactionId = payload.transactionId;
  }

  if (payload.paymentStatus === "paid") {
    payment.paidAt = new Date();
  }

  await payment.save();

  await Order.findByIdAndUpdate(payment.order, {
    paymentStatus: payload.paymentStatus,
  });

  return payment;
};

const getAllPayments = async () => {
  const payments = await Payment.find()
    .populate("user", "name email")
    .populate(
      "order",
      "totalAmount orderStatus paymentMethod"
    )
    .sort({ createdAt: -1 });

  return payments;
};

export const paymentService = {
  createPayment,
  getMyPayments,
  getPaymentByOrder,
  updatePaymentStatus,
  getAllPayments,
};