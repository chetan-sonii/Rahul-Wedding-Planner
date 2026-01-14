const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true // Fixed typo: 'lower' -> 'lowercase'
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    role: { // Renamed 'type' to 'role' to match AuthService usage
        type: String,
        default: "user",
        enum: ["user", "admin", "vendor"]
    }
});

// 1. Encrypt password before save
schema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// 2. ADD THIS METHOD (Crucial for Login)
schema.methods.isPasswordCorrect = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const model = mongoose.model("User", schema); // Capitalized 'User' is standard
module.exports = model;