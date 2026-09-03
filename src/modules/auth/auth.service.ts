import bcrypt from "bcryptjs";
import User from "../user/user.model";
import { ILoginRequest, IRegisterRequest } from "./auth.types";

const registerUser = async (payload: IRegisterRequest) => {
  const existingUser = await User.findOne({
    email: payload.email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    name: payload.name,
    email: payload.email.toLowerCase(),
    password: hashedPassword,
    phone: payload.phone,
    role: payload.role || "customer",
  });

  const { password, ...userObject } = user.toObject();

  return userObject;
};

const loginUser = async (payload: ILoginRequest) => {
  const user = await User.findOne({
    email: payload.email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  const { password, ...userObject } = user.toObject();

  return userObject;
};

export const authService = {
  registerUser,
  loginUser,
};