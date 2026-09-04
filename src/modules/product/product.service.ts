import Product from "./product.model";
import Category from "../category/category.model";

interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  images?: string[];
  category: string;
  brand: string;
}

const createProduct = async (
  payload: CreateProductPayload,
  vendorId: string
) => {
  const product = await Product.create({
    ...payload,
    vendor: vendorId,
  });

  return product;
};

const getAllProducts = async () => {
  const products = await Product.find()
    .populate("category", "name slug")
    .populate("brand", "name slug")
    .sort({ createdAt: -1 });

  return products;
};

const getProductById = async (productId: string) => {
  const product = await Product.findById(productId)
    .populate("category", "name slug")
    .populate("brand", "name slug");

  return product;
};

const updateProduct = async (
  productId: string,
  vendorId: string,
  payload: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    images?: string[];
    category?: string;
    brand?: string;
    isActive?: boolean;
  }
) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      vendor: vendorId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return product;
};

const deleteProduct = async (
  productId: string,
  vendorId: string
) => {
  const product = await Product.findOneAndDelete({
    _id: productId,
    vendor: vendorId,
  });

  return product;
};

const searchProductsForAI = async (
  search?: string,
  maxPrice?: number
) => {
  const filter: any = {
    isActive: true,
  };
  let categoryIds: any[] = [];

if (search) {
  const categories = await Category.find({
    name: {
      $regex: search,
      $options: "i",
    },
  }).select("_id");

  categoryIds = categories.map((category) => category._id);
}

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        category: {
          $in: categoryIds,
        },
      },
    ];
  }

  if (maxPrice !== undefined) {
    filter.price = {
      $lte: maxPrice,
    };
  }

  const products = await Product.find(filter)
    .populate("category", "name slug")
    .populate("brand", "name slug")
    .sort({ createdAt: -1 })
    .limit(10);

  return products;
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductsForAI,
};