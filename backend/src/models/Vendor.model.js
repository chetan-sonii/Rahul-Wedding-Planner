const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        // Added Catering and Decoration to the list
        enum: ["Venue", "Photographer", "Makeup", "Bridal Wear", "Groom Wear", "Mehndi", "Catering", "Decoration"]
    },
    city: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: String,
    isFeatured: { type: Boolean, default: false },

    // NEW FIELD FOR CONTACT INFO
    contact_info: {
        email: { type: String, default: "contact@vendor.com" },
        phone: { type: String, default: "+91 98765 43210" }
    }
}, { timestamps: true });

// Enable text search
vendorSchema.index({ name: 'text', city: 'text', category: 'text' });

module.exports = mongoose.model("Vendor", vendorSchema);