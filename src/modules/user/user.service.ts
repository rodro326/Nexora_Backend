import User from "./user.model";

const getAllUsers = async () => {
  const users = await User.find().select("-password");

  return users;
};

const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  return user;
};

export const userService = {
  getAllUsers,
  getUserById,
};