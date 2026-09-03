import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const userController = {
  getAllUsers,
  getUserById,
};