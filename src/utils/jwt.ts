import jwt from "jsonwebtoken";

const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};

export default generateToken;