import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../modules/user/user.model";

dotenv.config();

const createAdmin = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(mongoURI);

    const adminEmail = "admin@nexora.com";
    const adminPassword = "Admin@123456";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Nexora Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Admin creation failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();