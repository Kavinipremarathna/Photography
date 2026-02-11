import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import Admin from "./src/models/Admin.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  await Admin.deleteMany();
  await Admin.create({
    email: "admin@example.com",
    password: "Admin@123"
  });
  console.log("Admin seeded");
  process.exit();
};

seedAdmin();
