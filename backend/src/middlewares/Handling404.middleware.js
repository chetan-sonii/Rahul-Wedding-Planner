// backend/src/middlewares/Handling404.middleware.js
exports.HandlingNotFound = (err, req, res, next) => {
    // Default to 500 if statusCode is missing
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("🔥 Error caught by middleware:", message);

    res.status(statusCode).json({
        success: false,
        code: statusCode,
        error: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};