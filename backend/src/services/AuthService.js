const { User } = require("../models"); // Match the name in models/index.js
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status"); // Fix: Removed {default: httpStatus}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_wedding_planner_secret";

class AuthService {
    static async registerUser(body) {
        const { name, email, password } = body;

        const checkExist = await User.findOne({ email: email.toLowerCase() });
        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exists");
        }

        await User.create({ name, email, password });

        return { msg: "User Registered Successfully" };
    }

    static async loginUser(body) {
        const { email, password } = body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials");
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return {
            msg: "Login Success",
            token,
            user: userResponse
        };
    }
}

module.exports = AuthService;