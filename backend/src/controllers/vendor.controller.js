const Vendor = require("../models/Vendor.model");
// If you need ApiError, use: const ApiError = require("../utils/ApiError");

exports.addVendor = async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body);
        res.status(201).json({
            success: true,
            msg: "Vendor added successfully",
            vendor
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getVendors = async (req, res) => {
    try {
        const { city, category, search } = req.query;
        let query = {};

        if (city) query.city = { $regex: city, $options: "i" };
        if (category) query.category = category;

        // Text search if enabled in model
        if (search) {
            query.$text = { $search: search };
        }

        const vendors = await Vendor.find(query);

        res.status(200).json({
            success: true,
            count: vendors.length,
            vendors
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ success: false, error: "Vendor not found" });
        }

        res.status(200).json({
            success: true,
            vendor
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};