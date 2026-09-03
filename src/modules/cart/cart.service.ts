import Cart from "./cart.model";
import Product from "../product/product.model";

const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (!product.isActive) {
    throw new Error("This product is not available");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new Error("Insufficient stock");
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId as any,
        quantity,
      });
    }

    await cart.save();
  }

  return cart;
};

const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price stock images"
  );

  return cart;
};

const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId
  );

  if (!item) {
    throw new Error("Product not found in cart");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
};

const removeFromCart = async (
  userId: string,
  productId: string
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const initialLength = cart.items.length;

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (cart.items.length === initialLength) {
    throw new Error("Product not found in cart");
  }

  await cart.save();

  return cart;
};

const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return cart;
};

export const cartService = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};