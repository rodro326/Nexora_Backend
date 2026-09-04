import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { inventoryService } from "./inventory.service";

const createInventory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const inventory = await inventoryService.createInventory(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create inventory",
    });
  }
};

const getMyInventory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const inventory = await inventoryService.getMyInventory(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve inventory",
    });
  }
};

const getInventoryByProduct = async (
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

    const inventory = await inventoryService.getInventoryByProduct(
      String(req.params.productId),
      req.user.userId
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve inventory",
    });
  }
};

const updateInventory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const inventory = await inventoryService.updateInventory(
      String(req.params.productId),
      req.user.userId,
      req.body
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update inventory",
    });
  }
};

const deleteInventory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const inventory = await inventoryService.deleteInventory(
      String(req.params.productId),
      req.user.userId
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete inventory",
    });
  }
};

const getLowStockInventory = async (
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

    const inventory = await inventoryService.getLowStockInventory(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Low stock inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve low stock inventory",
    });
  }
};

export const inventoryController = {
  createInventory,
  getMyInventory,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
  getLowStockInventory,
};