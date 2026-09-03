import Wishlist from "./wishlist.model";
import Product from "../product/product.model";

const addToWishlist = async (
  userId: string,
  productId: string
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (!product.isActive) {
    throw new Error("This product is not available");
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [productId],
    });
  } else {
    const alreadyExists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (alreadyExists) {
      throw new Error("Product is already in wishlist");
    }

    wishlist.products.push(productId as any);

    await wishlist.save();
  }

  return wishlist;
};

const getWishlist = async (userId: string) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  }).populate(
    "products",
    "name price stock images"
  );

  return wishlist;
};

const removeFromWishlist = async (
  userId: string,
  productId: string
) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  const initialLength = wishlist.products.length;

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId
  );

  if (wishlist.products.length === initialLength) {
    throw new Error("Product not found in wishlist");
  }

  await wishlist.save();

  return wishlist;
};

const clearWishlist = async (userId: string) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  wishlist.products = [];

  await wishlist.save();

  return wishlist;
};

export const wishlistService = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};