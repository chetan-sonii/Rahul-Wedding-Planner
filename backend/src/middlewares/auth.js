const jwt = require("jsonwebtoken");
// REMOVED: const httpStatus = require("http-status");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            // Changed httpStatus.UNAUTHORIZED to 401
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_wedding_planner_secret_key");
        req.user = decoded; // Adds user ID to the request
        next();
    } catch (error) {
        // Changed httpStatus.UNAUTHORIZED to 401
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;