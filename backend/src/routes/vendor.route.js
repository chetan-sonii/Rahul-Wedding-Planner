const express = require("express");
const router = express.Router();
const VendorController = require("../controllers/Vendor.controller");

// Route definitions
router.post("/add", VendorController.addVendor); // For seeding or admin
router.get("/", VendorController.getVendors);
router.get("/:id", VendorController.getVendorById);

module.exports = router;