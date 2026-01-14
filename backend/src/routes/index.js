const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const vendorRoutes = require("./vendor.route"); // Import Vendor Routes

router.use("/auth", authRoutes);
router.use("/vendors", vendorRoutes); // Connect them

module.exports = router;
