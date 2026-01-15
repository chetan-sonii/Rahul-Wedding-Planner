const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Built-in Node module

const schema = new mongoose.Schema({
    // ... existing fields (name, email, password, etc.) ...
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
    checklist: [{ text: String, isCompleted: Boolean, dueDate: Date, note: String }],
    partnerName: String,
    weddingDate: Date,
    budget: Number,
    guestCount: Number,

    // NEW FIELDS FOR PASSWORD RESET
    resetPasswordToken: String,
    resetPasswordExpire: Date

}, { timestamps: true });

// ... existing pre-save middleware ...

// NEW METHOD: Generate Reset Token
schema.methods.getResetPasswordToken = function () {
    // 1. Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // 2. Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // 3. Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", schema);