import Inventory from "./inventory.model";
import Product from "../product/product.model";

const createInventory = async (
  vendorId: string,
  payload: {
    productId: string;
    quantity: number;
    lowStockThreshold?: number;
  }
) => {
  const product = await Product.findOne({
    _id: payload.productId,
    vendor: vendorId,
  });

  if (!product) {
    throw new Error("Product not found or does not belong to this vendor");
  }

  const existingInventory = await Inventory.findOne({
    product: payload.productId,
  });

  if (existingInventory) {
    throw new Error("Inventory already exists for this product");
  }

  const inventory = await Inventory.create({
    product: payload.productId,
    vendor: vendorId,
    quantity: payload.quantity,
    lowStockThreshold: payload.lowStockThreshold ?? 5,
  });

  return inventory;
};

const getMyInventory = async (vendorId: string) => {
  const inventory = await Inventory.find({
    vendor: vendorId,
  })
    .populate("product", "name price stock images")
    .sort({ createdAt: -1 });

  return inventory;
};

const getInventoryByProduct = async (
  productId: string,
  vendorId: string
) => {
  const inventory = await Inventory.findOne({
    product: productId,
    vendor: vendorId,
  }).populate("product", "name price stock images");

  return inventory;
};

const updateInventory = async (
  productId: string,
  vendorId: string,
  payload: {
    quantity?: number;
    lowStockThreshold?: number;
  }
) => {
  const inventory = await Inventory.findOneAndUpdate(
    {
      product: productId,
      vendor: vendorId,
    },
    {
      $set: payload,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  ).populate("product", "name price stock images");

  return inventory;
};

const deleteInventory = async (
  productId: string,
  vendorId: string
) => {
  const inventory = await Inventory.findOneAndDelete({
    product: productId,
    vendor: vendorId,
  });

  return inventory;
};

const getLowStockInventory = async (vendorId: string) => {
  const inventory = await Inventory.find({
    vendor: vendorId,
    $expr: {
      $lte: ["$quantity", "$lowStockThreshold"],
    },
  })
    .populate("product", "name price stock images")
    .sort({ quantity: 1 });

  return inventory;
};

export const inventoryService = {
  createInventory,
  getMyInventory,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
  getLowStockInventory,
};