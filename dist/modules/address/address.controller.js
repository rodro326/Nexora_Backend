"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressController = void 0;
const address_service_1 = require("./address.service");
const createAddress = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const address = await address_service_1.addressService.createAddress(req.user.userId, req.body);
        res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: address,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create address",
        });
    }
};
const getMyAddresses = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const addresses = await address_service_1.addressService.getMyAddresses(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Addresses retrieved successfully",
            data: addresses,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve addresses",
        });
    }
};
const getAddressById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const addressId = req.params.addressId;
        const address = await address_service_1.addressService.getAddressById(addressId, req.user.userId);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Address retrieved successfully",
            data: address,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve address",
        });
    }
};
const updateAddress = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const addressId = req.params.addressId;
        const address = await address_service_1.addressService.updateAddress(addressId, req.user.userId, req.body);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update address",
        });
    }
};
const deleteAddress = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const addressId = req.params.addressId;
        const address = await address_service_1.addressService.deleteAddress(addressId, req.user.userId);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: address,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete address",
        });
    }
};
exports.addressController = {
    createAddress,
    getMyAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
//# sourceMappingURL=address.controller.js.map