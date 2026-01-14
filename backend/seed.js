const mongoose = require("mongoose");

// 1. Define Schema Inline (to ensure script runs standalone)
const vendorSchema = new mongoose.Schema({
    name: String,
    category: {
        type: String,
        enum: ["Venue", "Photographer", "Makeup", "Bridal Wear", "Groom Wear", "Mehndi"]
    },
    city: String,
    price: Number,
    rating: Number,
    reviews_count: Number,
    image: String,
    images: [String],
    description: String,
    contact_info: { phone: String, email: String },
    isFeatured: Boolean
});

const Vendor = mongoose.model("Vendor", vendorSchema);

// 2. Dummy Data (Real images from WedMeGood for UI testing)
const sampleVendors = [
    {
        name: "The Grand Imperial",
        category: "Venue",
        city: "Delhi",
        price: 2500,
        rating: 4.8,
        reviews_count: 120,
        image: "https://image.wedmegood.com/resized/450X/uploads/member/1478950/1666005367_image5274.jpg",
        images: [],
        description: "Luxury banquet hall in the heart of Delhi.",
        contact_info: { phone: "9876543210", email: "info@grandimperial.com" },
        isFeatured: true
    },
    {
        name: "Royal Orchid Resort",
        category: "Venue",
        city: "Bangalore",
        price: 1800,
        rating: 4.5,
        reviews_count: 85,
        image: "https://image.wedmegood.com/resized/450X/uploads/member/12345/1600000000_image1.jpg",
        description: "Spacious lawn and poolside venue.",
        contact_info: { phone: "9876543210", email: "contact@royalorchid.com" },
        isFeatured: false
    },
    {
        name: "Stories by Joseph Radhik",
        category: "Photographer",
        city: "Mumbai",
        price: 150000,
        rating: 4.9,
        reviews_count: 300,
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/3/photography.jpg",
        description: "Award-winning cinematic wedding photography.",
        contact_info: { phone: "9998887776", email: "joe@stories.com" },
        isFeatured: true
    },
    {
        name: "Parul Garg Makeup",
        category: "Makeup",
        city: "Delhi",
        price: 35000,
        rating: 4.7,
        reviews_count: 500,
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/2/makeup.jpg",
        description: "Celebrity makeup artist specializing in bridal looks.",
        contact_info: { phone: "8887776665", email: "book@parulgarg.com" },
        isFeatured: true
    },
    {
        name: "Sabyasachi Mukherjee",
        category: "Bridal Wear",
        city: "Kolkata",
        price: 500000,
        rating: 5.0,
        reviews_count: 1000,
        image: "https://image.wedmegood.com/resized/450X/uploads/project/240562/1706612788_image2689.jpg",
        description: "Iconic bridal lehengas and sarees.",
        contact_info: { phone: "1112223334", email: "sales@sabyasachi.com" },
        isFeatured: true
    },
    {
        name: "Raju Mehandi Artist",
        category: "Mehndi",
        city: "Delhi",
        price: 5000,
        rating: 4.2,
        reviews_count: 45,
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/6/mehndi.jpg",
        description: "Intricate bridal mehndi designs.",
        contact_info: { phone: "5556667778", email: "raju@mehndi.com" },
        isFeatured: false
    }
];

// 3. Execution Function
const seedDB = async () => {
    try {
        // Connect using your connection string
        await mongoose.connect("mongodb://127.0.0.1:27017/Rahul_Wedding_Planner")
        console.log(`the db is connect with ${mongoose.connection.host}`);

        // Clear existing data
        await Vendor.deleteMany({});
        console.log("🧹 Cleared existing vendors...");

        // Insert new data
        await Vendor.insertMany(sampleVendors);
        console.log("✅ Seeded database with " + sampleVendors.length + " vendors!");

        mongoose.disconnect();
        console.log("👋 Disconnected.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();