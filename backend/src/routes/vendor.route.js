const express = require("express");
const router = express.Router();
const VendorController = require("../controllers/Vendor.controller");

router.post("/add", VendorController.addVendor);
router.get("/cities", VendorController.getVendorCities); // NEW ROUTE
router.get("/", VendorController.getVendors);
router.get("/:id", VendorController.getVendorById);

module.exports = router;