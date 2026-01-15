const AuthService = require("../services/AuthService");
const CatchAsync = require("../utils/CatchAsync");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto"); // FIXED: Added missing import
const bcrypt = require("bcrypt"); // FIXED: Added missing import

class AuthController {
    static registerUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.registerUser(req.body);
        res.status(201).json({ success: true, ...res_obj });
    });

    static loginUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.loginUser(req.body);
        res.status(200).json({ success: true, ...res_obj });
    });

    static Profile = CatchAsync(async (req, res) => {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ success: true, user });
    });

    static forgotPassword = CatchAsync(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            throw new ApiError(404, "No user found with this email");
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        try {
            console.log("------------------------------------------------");
            console.log("📧 EMAIL SIMULATION - RESET PASSWORD LINK:");
            console.log(resetUrl);
            console.log("------------------------------------------------");

            res.status(200).json({ success: true, data: "Email sent" });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            throw new ApiError(500, "Email could not be sent");
        }
    });

    static resetPassword = CatchAsync(async (req, res) => {
        // 1. Hash the token from URL to match DB
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        // 2. Find user with valid token and expiration
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            throw new ApiError(400, "Invalid or expired token");
        }

        // 3. FAIL-SAFE UPDATE
        // We manually hash the password here and use findByIdAndUpdate
        // This prevents the 'pre-save' hook from running and potentially double-hashing
        // or failing to hash the password.
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            resetPasswordToken: undefined,
            resetPasswordExpire: undefined
        });

        res.status(200).json({ success: true, message: "Password updated successfully" });
    });
}

module.exports = AuthController;