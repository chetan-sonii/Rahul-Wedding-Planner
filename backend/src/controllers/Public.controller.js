const { VendorModel } = require("../models");
const CatchAsync = require("../utils/CatchAsync");

exports.getHomepageData = CatchAsync(async (req, res) => {
    // 1. Fetch Top Rated Venues (Real DB Data)
    const popularVenues = await VendorModel.find({ category: "Venue" })
        .sort({ rating: -1 }) // Highest rated first
        .limit(3)
        .select("name city image rating category");

    // 2. Fetch Stats (Optional, for other sections)
    const totalVendors = await VendorModel.countDocuments();

    res.status(200).json({
        success: true,
        data: {
            popularVenues,
            totalVendors
        }
    });
});