// backend/src/services/AuthService.js
const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretweddingkey";

class AuthService {
    static async registerUser(body) {
        const { email, password, name } = body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
        }

        const user = await User.create({ name, email, password });
        const userResponse = user.toObject();
        delete userResponse.password;

        return { msg: "Registered Successfully", user: userResponse };
    }

    static async loginUser(body) {
        const { email, password } = body;

        const user = await User.findOne({ email });
        if (!user || !(await user.isPasswordCorrect(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return { msg: "Login Successful", token, user: userResponse };
    }
}

module.exports = AuthService;