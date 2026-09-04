"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryController = void 0;
const inventory_service_1 = require("./inventory.service");
const createInventory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const inventory = await inventory_service_1.inventoryService.createInventory(req.user.userId, req.body);
        res.status(201).json({
            success: true,
            message: "Inventory created successfully",
            data: inventory,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create inventory",
        });
    }
};
const getMyInventory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const inventory = await inventory_service_1.inventoryService.getMyInventory(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Inventory retrieved successfully",
            data: inventory,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve inventory",
        });
    }
};
const getInventoryByProduct = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const inventory = await inventory_service_1.inventoryService.getInventoryByProduct(String(req.params.productId), req.user.userId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve inventory",
        });
    }
};
const updateInventory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const inventory = await inventory_service_1.inventoryService.updateInventory(String(req.params.productId), req.user.userId, req.body);
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update inventory",
        });
    }
};
const deleteInventory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const inventory = await inventory_service_1.inventoryService.deleteInventory(String(req.params.productId), req.user.userId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete inventory",
        });
    }
};
const getLowStockInventory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const inventory = await inventory_service_1.inventoryService.getLowStockInventory(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Low stock inventory retrieved successfully",
            data: inventory,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve low stock inventory",
        });
    }
};
exports.inventoryController = {
    createInventory,
    getMyInventory,
    getInventoryByProduct,
    updateInventory,
    deleteInventory,
    getLowStockInventory,
};
//# sourceMappingURL=inventory.controller.js.map