// src/middlewares/Handling404.middleware.js
exports.HandlingNotFound = (err, req, res, next) => {
    // If headers already sent, delegate to default Express error handler
    if (res.headersSent) return next(err);

    // If called without an error object (e.g. mounted incorrectly), respond 404
    if (!err || typeof err !== "object") {
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: `${req.method} ${req.originalUrl} not found`
        });
    }

    // Normalize possible status fields
    const rawStatus = err.statusCode ?? err.status ?? err.status_code ?? err.code;
    const parsed = Number(rawStatus);
    const statusCode = (Number.isInteger(parsed) && parsed >= 100 && parsed <= 599) ? parsed : 500;

    const message = err.message || "Internal Server Error";

    // Log full error for debugging (safe to remove or reduce in prod)
    console.error(err);

    res.status(statusCode).json({
        code: statusCode,
        error: message,
        ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {})
    });
};
