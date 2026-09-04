import Order from "./order.model";
import Cart from "../cart/cart.model";
import Product from "../product/product.model";

const createOrder = async (
  userId: string,
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  },
  paymentMethod: "cod" | "card" | "online"
) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems = [];

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.isActive) {
      throw new Error(`Product "${product.name}" is not available`);
    }

    if (product.stock < cartItem.quantity) {
      throw new Error(`Insufficient stock for "${product.name}"`);
    }

    const subtotal = product.price * cartItem.quantity;

    orderItems.push({
      product: product._id,
      vendor: product.vendor,
      quantity: cartItem.quantity,
      price: product.price,
      subtotal,
    });
  }

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    totalAmount,
    paymentMethod,
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: -item.quantity,
      },
    });
  }

  cart.items = [];
  await cart.save();

  return order;
};

const getMyOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId })
    .populate("items.product", "name price images")
    .populate("items.vendor", "name email")
    .sort({ createdAt: -1 });

  return orders;
};

const getOrderById = async (
  orderId: string,
  userId: string
) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  })
    .populate("items.product", "name price images")
    .populate("items.vendor", "name email");

  return order;
};

const updateOrderStatus = async (
  orderId: string,
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  return order;
};

const updatePaymentStatus = async (
  orderId: string,
  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "refunded"
) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { paymentStatus },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  return order;
};

export const orderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
};