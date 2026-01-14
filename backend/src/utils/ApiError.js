// src/utils/ApiError.js
class ApiError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error") {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;
