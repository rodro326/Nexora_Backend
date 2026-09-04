import User from "../user/user.model";
import Product from "../product/product.model";
import Order from "../order/order.model";

const getAdminAnalytics = async () => {
  const [
    totalCustomers,
    totalVendors,
    totalProducts,
    totalOrders,
    revenueData,
    orderStatusData,
  ] = await Promise.all([
    // Total customers
    User.countDocuments({ role: "customer" }),

    // Total vendors
    User.countDocuments({ role: "vendor" }),

    // Active products
    Product.countDocuments({ isActive: true }),

    // Total orders
    Order.countDocuments(),

    // Total revenue
    Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          orderStatus: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]),

    // Order status statistics
    Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]),
  ]);

  return {
    totalCustomers,
    totalVendors,
    totalProducts,
    totalOrders,
    totalRevenue: revenueData[0]?.totalRevenue || 0,
    orderStatus: orderStatusData,
  };
};

const getVendorAnalytics = async (vendorId: string) => {
  const [
    totalProducts,
    orderData,
    revenueData,
  ] = await Promise.all([
    // Vendor's active products
    Product.countDocuments({
      vendor: vendorId,
      isActive: true,
    }),

    // Vendor order statistics
    Order.aggregate([
      {
        $match: {
          "items.vendor": vendorId,
          orderStatus: { $ne: "cancelled" },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items.vendor": vendorId,
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalItemsSold: { $sum: "$items.quantity" },
        },
      },
    ]),

    // Vendor revenue
    Order.aggregate([
      {
        $match: {
          "items.vendor": vendorId,
          paymentStatus: "paid",
          orderStatus: { $ne: "cancelled" },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items.vendor": vendorId,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$items.subtotal" },
        },
      },
    ]),
  ]);

  return {
    totalProducts,
    totalOrders: orderData[0]?.totalOrders || 0,
    totalItemsSold: orderData[0]?.totalItemsSold || 0,
    totalRevenue: revenueData[0]?.totalRevenue || 0,
  };
};

export const analyticsService = {
  getAdminAnalytics,
  getVendorAnalytics,
};