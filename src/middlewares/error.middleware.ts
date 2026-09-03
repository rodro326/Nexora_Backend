import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default errorMiddleware;