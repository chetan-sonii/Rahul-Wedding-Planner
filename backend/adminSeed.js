require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./src/models/Admin.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Rahul_Wedding_Planner";

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // 1. Check if an admin already exists
        const existingAdmin = await Admin.findOne({ email: "admin@subhvivah.com" });

        if (existingAdmin) {
            console.log("⚠️  Admin already exists. No changes made.");
            process.exit();
        }

        // 2. Create new Admin
        // The password will be automatically hashed by the pre-save middleware in Admin.model.js
        const newAdmin = new Admin({
            name: "Master Admin",
            email: "admin@subhvivah.com",
            password: "admin123" // Change this to a strong password in production
        });

        await newAdmin.save();
        console.log("🎉 Admin created successfully!");
        console.log("   Email: admin@subhvivah.com");
        console.log("   Password: admin123");

        process.exit();

    } catch (error) {
        console.error("❌ Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();