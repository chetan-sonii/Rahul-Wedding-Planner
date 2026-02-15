const express = require("express");
const router = express.Router();
const {
    adminLogin,
    getStats,
    getAllUsers,
    deleteUser,
    getAllVendors,
    createVendor,
    deleteVendor,
    getAllInquiries,
    deleteInquiry,
    updateVendor,
} = require("../controllers/Admin.controller");
const adminAuth = require("../middlewares/adminAuth");

// Public Admin Route
router.post("/login", adminLogin);

// Protected Admin Routes (Require Login)
router.get("/stats", adminAuth, getStats);

// User Management
router.get("/users", adminAuth, getAllUsers);
router.delete("/users/:id", adminAuth, deleteUser);

// Vendor Management
router.get("/vendors", adminAuth, getAllVendors);
router.post("/vendors", adminAuth, createVendor);
router.delete("/vendors/:id", adminAuth, deleteVendor);
router.put("/vendors/:id", adminAuth, updateVendor);

// Inquiry Management
router.get("/inquiries", adminAuth, getAllInquiries);
router.delete("/inquiries/:id", adminAuth, deleteInquiry);

module.exports = router;