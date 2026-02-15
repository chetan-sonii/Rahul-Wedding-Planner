const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const ApiError = require("../utils/ApiError");

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return next(new ApiError(401, "Admin access denied. No token provided."));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return next(new ApiError(401, "Invalid Admin Token"));
        }

        req.admin = admin;
        next();
    } catch (error) {
        return next(new ApiError(401, "Session expired. Please login again."));
    }
};

module.exports = adminAuth;