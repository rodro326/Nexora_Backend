import Payment from "./payment.model";
import Order from "../order/order.model";
import { initiatePayment } from "./sslcommerz.service";
import crypto from "crypto";
import { validatePayment } from "./sslcommerz.service";

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
  }).populate("user", "name email");

  if (!order) {
    throw new Error(
      "Order not found or does not belong to this customer"
    );
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

  // COD payment
  if (payload.paymentMethod === "cod") {
    const payment = await Payment.create({
      order: payload.orderId,
      user: userId,
      amount: payload.amount,
      paymentMethod: "cod",
      paymentStatus: "pending",
    });

    return {
      payment,
      gatewayUrl: null,
    };
  }

  // SSLCommerz payment
  const transactionId =
    payload.transactionId || `NEXORA_${crypto.randomUUID()}`;

  const customer = order.user as any;

  const payment = await Payment.create({
    order: payload.orderId,
    user: userId,
    amount: payload.amount,
    paymentMethod: payload.paymentMethod,
    paymentStatus: "pending",
    transactionId,
  });



  const gatewayResponse = await initiatePayment({
    totalAmount: payload.amount,
    transactionId,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: "01700000000",
  });

  return {
    payment,
    gatewayUrl: gatewayResponse.GatewayPageURL,
  };
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

const validateAndCompletePayment = async (valId: string) => {
  const validationResponse = await validatePayment(valId);

  if (validationResponse.status !== "VALID") {
    throw new Error("SSLCommerz payment validation failed");
  }

  const transactionId = validationResponse.tran_id;
  const amount = Number(validationResponse.amount);
  const currency = validationResponse.currency;

  if (!transactionId) {
    throw new Error("Transaction ID missing from SSLCommerz response");
  }

  if (currency !== "BDT") {
    throw new Error("Invalid payment currency");
  }

  const payment = await Payment.findOne({
    transactionId,
  });

  if (!payment) {
    throw new Error("Payment record not found");
  }

  if (payment.amount !== amount) {
    throw new Error("Payment amount does not match");
  }

  payment.paymentStatus = "paid";
  payment.paidAt = new Date();

  await payment.save();

  await Order.findByIdAndUpdate(payment.order, {
    paymentStatus: "paid",
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
  validateAndCompletePayment,
};