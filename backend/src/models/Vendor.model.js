const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Venue", "Photographer", "Makeup", "Bridal Wear", "Groom Wear", "Mehndi"]
    },
    city: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: String,
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// Enable text search for the Hero search bar
vendorSchema.index({ name: 'text', city: 'text', category: 'text' });

module.exports = mongoose.model("Vendor", vendorSchema);