import { Response } from "express";
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

export const productController = {
  createProduct,
};