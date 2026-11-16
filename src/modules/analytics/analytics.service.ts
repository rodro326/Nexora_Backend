
import User from "../user/user.model";
import Product from "../product/product.model";
import Order from "../order/order.model";

type AnalyticsPeriod = "daily" | "weekly" | "monthly";

const getAdminAnalytics = async (
  period: AnalyticsPeriod = "daily"
) => {
  const now = new Date();

  const startDate = new Date(now);

  if (period === "daily") {
    startDate.setDate(startDate.getDate() - 6);
  } else if (period === "weekly") {
    startDate.setDate(startDate.getDate() - 55);
  } else {
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);
  }

  const chartFormat =
    period === "daily"
      ? "%Y-%m-%d"
      : period === "weekly"
        ? "%G-W%V"
        : "%Y-%m";

  const [
    totalCustomers,
    totalVendors,
    totalProducts,
    totalOrders,
    totalRevenueData,
    orderStatusData,
    salesOverview,
    recentOrders,
  ] = await Promise.all([
    User.countDocuments({ role: "customer" }),

    User.countDocuments({ role: "vendor" }),

    Product.countDocuments({ isActive: true }),

    Order.countDocuments(),

    // Revenue from delivered orders only
    Order.aggregate([
      {
        $match: {
          orderStatus: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]),

    // Order status breakdown
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

    // Revenue chart
    Order.aggregate([
      {
        $match: {
          orderStatus: "delivered",
          createdAt: { $gte: startDate, $lte: now },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: chartFormat,
              date: "$createdAt",
              timezone: "Asia/Dhaka",
            },
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          revenue: 1,
          orders: 1,
        },
      },
    ]),

    // Latest platform orders
    Order.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .select("user totalAmount orderStatus paymentStatus createdAt")
      .populate("user", "name email")
      .lean(),
  ]);

  const orderStatus = {
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  orderStatusData.forEach((item) => {
    if (item._id in orderStatus) {
      orderStatus[item._id as keyof typeof orderStatus] =
        item.count;
    }
  });

  return {
    summary: {
      totalRevenue: totalRevenueData[0]?.totalRevenue || 0,
      totalOrders,
      totalCustomers,
      totalVendors,
      totalProducts,
      deliveredOrders: orderStatus.delivered,
      pendingOrders: orderStatus.pending,
    },

    orderStatus,

    salesOverview,

    recentOrders,

    filters: {
      period,
      startDate,
      endDate: now,
    },
  };
};

const getVendorAnalytics = async (vendorId: string) => {
  const [
    totalProducts,
    orderData,
    revenueData,
  ] = await Promise.all([
    Product.countDocuments({
      vendor: vendorId,
      isActive: true,
    }),

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

    Order.aggregate([
      {
        $match: {
          "items.vendor": vendorId,
          orderStatus: "delivered",
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
