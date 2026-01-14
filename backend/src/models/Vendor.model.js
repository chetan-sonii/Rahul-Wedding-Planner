import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vendor name is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Venue", "Photographer", "Makeup", "Bridal Wear", "Groom Wear", "Mehndi"], // Add more as needed
        index: true // Helps with faster searching
    },
    city: {
        type: String,
        required: [true, "City is required"],
        index: true
    },
    price: {
        type: Number,
        required: [true, "Starting price is required"]
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews_count: {
        type: Number,
        default: 0
    },
    image: {
        type: String, // Main display image URL
        required: true
    },
    images: [
        { type: String } // Array of additional gallery images
    ],
    description: {
        type: String,
        trim: true
    },
    contact_info: {
        phone: String,
        email: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Text index for search functionality (allows searching by name, city, or category)
vendorSchema.index({ name: 'text', city: 'text', category: 'text' });

export const Vendor = mongoose.model("Vendor", vendorSchema);