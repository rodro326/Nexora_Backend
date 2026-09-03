import Product from "./product.model";

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

export const productService = {
  createProduct,
};