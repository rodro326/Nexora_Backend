import Address from "./address.model";

const createAddress = async (
  userId: string,
  payload: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    isDefault?: boolean;
  }
) => {
  if (payload.isDefault) {
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );
  }

  const address = await Address.create({
    user: userId,
    ...payload,
  });

  return address;
};

const getMyAddresses = async (userId: string) => {
  const addresses = await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  return addresses;
};

const getAddressById = async (
  addressId: string,
  userId: string
) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  return address;
};

const updateAddress = async (
  addressId: string,
  userId: string,
  payload: {
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    isDefault?: boolean;
  }
) => {
  if (payload.isDefault) {
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );
  }

  const address = await Address.findOneAndUpdate(
    {
      _id: addressId,
      user: userId,
    },
    {
      $set: payload,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  return address;
};

const deleteAddress = async (
  addressId: string,
  userId: string
) => {
  const address = await Address.findOneAndDelete({
    _id: addressId,
    user: userId,
  });

  return address;
};

export const addressService = {
  createAddress,
  getMyAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};