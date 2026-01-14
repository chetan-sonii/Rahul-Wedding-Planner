const httpStatus = require("http-status");
const { User } = require("../models"); // Ensure index.js exports User
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

// Use a secret key (In production, put this in .env)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretweddingkey";

class AuthService {
    static async registerUser(body) {
        const { email, password, name } = body;

        // 1. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
        }

        // 2. Create User
        const user = await User.create({ name, email, password });

        // 3. Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        return {
            msg: "Registered Successfully",
            user: userResponse
        };
    }

    static async loginUser(body) {
        const { email, password } = body;

        // 1. Find User
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        // 2. Check Password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        // 3. Generate Token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 4. Return Data
        const userResponse = user.toObject();
        delete userResponse.password;

        return {
            msg: "Login Successful",
            token,
            user: userResponse
        };
    }
}

module.exports.AuthService = require("./AuthService");