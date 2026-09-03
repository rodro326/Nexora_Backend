import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { productService } from "./product.service";

const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const product = await productService.createProduct(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Product creation failed",
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to retrieve products",
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId as string;

    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to retrieve product",
    });
  }
};

const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const productId = req.params.productId as string;

    const product = await productService.updateProduct(
      productId,
      req.user.userId,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you do not own this product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Product update failed",
    });
  }
};

const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const productId = req.params.productId as string;

    const product = await productService.deleteProduct(
      productId,
      req.user.userId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you do not own this product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Product deletion failed",
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};