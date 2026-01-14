const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "vendor"] },

    // Vendor Shortlist
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],

    // Wedding Details
    partnerName: { type: String, default: "" },
    weddingDate: { type: Date },
    budget: { type: Number, default: 0 },
    guestCount: { type: Number, default: 0 },

    // RICH CHECKLIST SCHEMA
    checklist: [{
        text: String,
        isCompleted: { type: Boolean, default: false },
        dueDate: { type: Date }, // New Field
        note: { type: String, default: "" } // New Field
    }]

}, { timestamps: true });

// ... (keep pre-save and isPasswordCorrect methods unchanged)

schema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

schema.methods.isPasswordCorrect = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", schema);