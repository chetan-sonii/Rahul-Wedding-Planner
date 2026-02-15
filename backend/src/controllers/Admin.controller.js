const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const Vendor = require("../models/Vendor.model");
const Contact = require("../models/Contact.model"); // Assuming you have this
const jwt = require("jsonwebtoken");
const CatchAsync = require("../utils/CatchAsync");
const ApiError = require("../utils/ApiError");

// --- 1. Admin Login ---
exports.adminLogin = CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return next(new ApiError(400, "Invalid Admin Credentials"));

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return next(new ApiError(400, "Invalid Admin Credentials"));

    // Generate Token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.status(200).json({
        success: true,
        token,
        admin: { id: admin._id, name: admin.name, email: admin.email }
    });
});

// --- 2. Dashboard Statistics ---
exports.getStats = CatchAsync(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalInquiries = await Contact.countDocuments();

    res.status(200).json({
        success: true,
        stats: {
            users: totalUsers,
            vendors: totalVendors,
            inquiries: totalInquiries
        }
    });
});

// --- 3. User Management ---
exports.getAllUsers = CatchAsync(async (req, res) => {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
});

exports.deleteUser = CatchAsync(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "User deleted successfully" });
});

// --- 4. Vendor Management ---
exports.getAllVendors = CatchAsync(async (req, res) => {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, vendors });
});

exports.createVendor = CatchAsync(async (req, res) => {
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({ success: true, vendor: newVendor });
});

exports.deleteVendor = CatchAsync(async (req, res) => {
    await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Vendor deleted successfully" });
});

// --- 5. Inquiry Management ---
exports.getAllInquiries = CatchAsync(async (req, res) => {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
});

exports.deleteInquiry = CatchAsync(async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Inquiry deleted" });
});

exports.updateVendor = CatchAsync(async (req, res) => {
    const updatedVendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, vendor: updatedVendor });
});