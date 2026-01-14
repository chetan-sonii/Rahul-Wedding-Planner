const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true // Fixed: Change 'lower' to 'lowercase'
    },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, default: "user", enum: ["user", "admin", "vendor"] }
}, { timestamps: true });

schema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const model = mongoose.model("User", schema);
module.exports = model;