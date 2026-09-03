import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { wishlistService } from "./wishlist.service";

const addToWishlist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { productId } = req.body;

    const wishlist = await wishlistService.addToWishlist(
      req.user.userId,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add product to wishlist",
    });
  }
};

const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const wishlist = await wishlistService.getWishlist(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve wishlist",
    });
  }
};

const removeFromWishlist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { productId } = req.body;

    const wishlist = await wishlistService.removeFromWishlist(
      req.user.userId,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to remove product from wishlist",
    });
  }
};

const clearWishlist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const wishlist = await wishlistService.clearWishlist(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to clear wishlist",
    });
  }
};

export const wishlistController = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};