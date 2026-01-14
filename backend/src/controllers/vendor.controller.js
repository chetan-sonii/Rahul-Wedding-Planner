const { VendorModel } = require("../models");

// 1. Add Vendor
exports.addVendor = async (req, res) => {
    try {
        const vendor = await VendorModel.create(req.body);
        res.status(201).json({ success: true, msg: "Vendor added", vendor });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Get Vendors (Listing)
exports.getVendors = async (req, res) => {
    try {
        const { search, city, category } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } }
            ];
        }
        if (city) query.city = { $regex: city, $options: "i" };
        if (category) query.category = category;

        const vendors = await VendorModel.find(query);
        res.status(200).json({ success: true, count: vendors.length, vendors });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. Get Vendor By ID
exports.getVendorById = async (req, res) => {
    try {
        const vendor = await VendorModel.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ success: false, error: "Vendor not found" });
        }
        res.status(200).json({ success: true, vendor });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 4. Get Vendor Cities
exports.getVendorCities = async (req, res) => {
    try {
        const cities = await VendorModel.distinct("city");
        res.status(200).json({ success: true, cities });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};