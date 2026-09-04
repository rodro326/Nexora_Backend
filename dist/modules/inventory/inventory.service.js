"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = void 0;
const inventory_model_1 = __importDefault(require("./inventory.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const createInventory = async (vendorId, payload) => {
    const product = await product_model_1.default.findOne({
        _id: payload.productId,
        vendor: vendorId,
    });
    if (!product) {
        throw new Error("Product not found or does not belong to this vendor");
    }
    const existingInventory = await inventory_model_1.default.findOne({
        product: payload.productId,
    });
    if (existingInventory) {
        throw new Error("Inventory already exists for this product");
    }
    const inventory = await inventory_model_1.default.create({
        product: payload.productId,
        vendor: vendorId,
        quantity: payload.quantity,
        lowStockThreshold: payload.lowStockThreshold ?? 5,
    });
    return inventory;
};
const getMyInventory = async (vendorId) => {
    const inventory = await inventory_model_1.default.find({
        vendor: vendorId,
    })
        .populate("product", "name price stock images")
        .sort({ createdAt: -1 });
    return inventory;
};
const getInventoryByProduct = async (productId, vendorId) => {
    const inventory = await inventory_model_1.default.findOne({
        product: productId,
        vendor: vendorId,
    }).populate("product", "name price stock images");
    return inventory;
};
const updateInventory = async (productId, vendorId, payload) => {
    const inventory = await inventory_model_1.default.findOne({
        product: productId,
        vendor: vendorId,
    });
    if (!inventory) {
        return null;
    }
    if (payload.quantity !== undefined) {
        await product_model_1.default.findOneAndUpdate({
            _id: productId,
            vendor: vendorId,
        }, {
            $set: {
                stock: payload.quantity,
            },
        }, {
            runValidators: true,
        });
        inventory.quantity = payload.quantity;
    }
    if (payload.lowStockThreshold !== undefined) {
        inventory.lowStockThreshold = payload.lowStockThreshold;
    }
    await inventory.save();
    return inventory_model_1.default.findById(inventory._id).populate("product", "name price stock images");
};
const deleteInventory = async (productId, vendorId) => {
    const inventory = await inventory_model_1.default.findOneAndDelete({
        product: productId,
        vendor: vendorId,
    });
    return inventory;
};
const getLowStockInventory = async (vendorId) => {
    const inventory = await inventory_model_1.default.find({
        vendor: vendorId,
        $expr: {
            $lte: ["$quantity", "$lowStockThreshold"],
        },
    })
        .populate("product", "name price stock images")
        .sort({ quantity: 1 });
    return inventory;
};
exports.inventoryService = {
    createInventory,
    getMyInventory,
    getInventoryByProduct,
    updateInventory,
    deleteInventory,
    getLowStockInventory,
};
//# sourceMappingURL=inventory.service.js.map