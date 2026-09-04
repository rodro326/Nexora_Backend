"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressService = void 0;
const address_model_1 = __importDefault(require("./address.model"));
const createAddress = async (userId, payload) => {
    if (payload.isDefault) {
        await address_model_1.default.updateMany({ user: userId }, { $set: { isDefault: false } });
    }
    const address = await address_model_1.default.create({
        user: userId,
        ...payload,
    });
    return address;
};
const getMyAddresses = async (userId) => {
    const addresses = await address_model_1.default.find({ user: userId }).sort({
        isDefault: -1,
        createdAt: -1,
    });
    return addresses;
};
const getAddressById = async (addressId, userId) => {
    const address = await address_model_1.default.findOne({
        _id: addressId,
        user: userId,
    });
    return address;
};
const updateAddress = async (addressId, userId, payload) => {
    if (payload.isDefault) {
        await address_model_1.default.updateMany({ user: userId }, { $set: { isDefault: false } });
    }
    const address = await address_model_1.default.findOneAndUpdate({
        _id: addressId,
        user: userId,
    }, {
        $set: payload,
    }, {
        returnDocument: "after",
        runValidators: true,
    });
    return address;
};
const deleteAddress = async (addressId, userId) => {
    const address = await address_model_1.default.findOneAndDelete({
        _id: addressId,
        user: userId,
    });
    return address;
};
exports.addressService = {
    createAddress,
    getMyAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
//# sourceMappingURL=address.service.js.map