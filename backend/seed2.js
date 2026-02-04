require("dotenv").config();
const mongoose = require("mongoose");
const Vendor = require("./src/models/Vendor.model"); // Ensure path is correct

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Rahul_Wedding_Planner";

// --- RELIABLE IMAGE LINKS (Unsplash with specific IDs) ---
const images = {
    venue: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80", // Hall
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", // Resort
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"  // Hotel
    ],
    photographer: [
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80", // Couple
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80", // Traditional
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"  // Candid
    ],
    makeup: [
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80", // Eye makeup
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80", // Full face
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"  // Brush kit
    ],
    bridal: [
        "https://images.unsplash.com/photo-1594513297252-7e99738f6f55?auto=format&fit=crop&w=800&q=80", // Red Lehenga
        "https://images.unsplash.com/photo-1610173827002-6b4e96803151?auto=format&fit=crop&w=800&q=80", // Jewelry/Saree
        "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80"  // Fabric
    ],
    groom: [
        "https://images.unsplash.com/photo-1593032465175-d81f0f53d35b?auto=format&fit=crop&w=800&q=80", // Sherwani style
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", // Suit
        "https://images.unsplash.com/photo-1559582930-bb01d5e5c9b3?auto=format&fit=crop&w=800&q=80"  // Tuxedo
    ],
    mehndi: [
        "https://images.unsplash.com/photo-1569254994521-dd681aef11f1?auto=format&fit=crop&w=800&q=80", // Hands
        "https://images.unsplash.com/photo-1620164667958-3729f271295b?auto=format&fit=crop&w=800&q=80", // Intricate
        "https://images.unsplash.com/photo-1596230529625-7ee541fb331c?auto=format&fit=crop&w=800&q=80"  // Feet
    ],
    catering: [
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80", // Buffet
        "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80", // Platter
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"  // Fine Dining
    ],
    decoration: [
        "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=800&q=80", // Flowers
        "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=800&q=80", // Lights
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"  // Table setting
    ]
};

const vendors = [
    // --- VENUES ---
    {
        name: "The Grand Oberoi Palace",
        category: "Venue",
        city: "Udaipur",
        price: 500000,
        rating: 4.9,
        image: images.venue[0],
        description: "A royal destination for your big day with lakeside views.",
        contact_info: { phone: "9876543210", email: "info@oberoi.com" }
    },
    {
        name: "Hyatt Regency Hall",
        category: "Venue",
        city: "Mumbai",
        price: 350000,
        rating: 4.7,
        image: images.venue[1],
        description: "Modern luxury banquet hall in the heart of Mumbai.",
        contact_info: { phone: "9876543211", email: "events@hyatt.com" }
    },
    {
        name: "Green Meadows Resort",
        category: "Venue",
        city: "Bangalore",
        price: 250000,
        rating: 4.5,
        image: images.venue[2],
        description: "Spacious open lawns perfect for evening receptions.",
        contact_info: { phone: "9876543212", email: "booking@greenmeadows.com" }
    },

    // --- PHOTOGRAPHERS ---
    {
        name: "Stories by Joseph",
        category: "Photographer",
        city: "Mumbai",
        price: 150000,
        rating: 4.8,
        image: images.photographer[0],
        description: "Capturing candid moments that last a lifetime.",
        contact_info: { phone: "9876543213", email: "joe@stories.com" }
    },
    {
        name: "The Wedding Salad",
        category: "Photographer",
        city: "Delhi",
        price: 120000,
        rating: 4.6,
        image: images.photographer[1],
        description: "Artistic and cinematic wedding photography.",
        contact_info: { phone: "9876543214", email: "hello@weddingsalad.com" }
    },
    {
        name: "Pixel Perfect Studios",
        category: "Photographer",
        city: "Bangalore",
        price: 80000,
        rating: 4.3,
        image: images.photographer[2],
        description: "Traditional and pre-wedding shoots at affordable rates.",
        contact_info: { phone: "9876543215", email: "info@pixelperfect.com" }
    },

    // --- MAKEUP ---
    {
        name: "Ojas Rajani Makeup",
        category: "Makeup",
        city: "Mumbai",
        price: 45000,
        rating: 4.9,
        image: images.makeup[0],
        description: "Celebrity makeup artist specializing in bridal looks.",
        contact_info: { phone: "9876543216", email: "ojas@makeup.com" }
    },
    {
        name: "Parul Garg Studio",
        category: "Makeup",
        city: "Delhi",
        price: 35000,
        rating: 4.8,
        image: images.makeup[1],
        description: "Airbrush and HD makeup for the modern bride.",
        contact_info: { phone: "9876543217", email: "parul@garg.com" }
    },
    {
        name: "Glam by Sneha",
        category: "Makeup",
        city: "Pune",
        price: 20000,
        rating: 4.4,
        image: images.makeup[2],
        description: "Subtle and natural makeup services.",
        contact_info: { phone: "9876543218", email: "sneha@glam.com" }
    },

    // --- BRIDAL WEAR ---
    {
        name: "Sabyasachi Couture",
        category: "Bridal Wear",
        city: "Kolkata",
        price: 400000,
        rating: 5.0,
        image: images.bridal[0],
        description: "The ultimate destination for royal bridal lehengas.",
        contact_info: { phone: "9876543219", email: "store@sabyasachi.com" }
    },
    {
        name: "Manish Malhotra",
        category: "Bridal Wear",
        city: "Mumbai",
        price: 350000,
        rating: 4.9,
        image: images.bridal[1],
        description: "Contemporary Bollywood style bridal fashion.",
        contact_info: { phone: "9876543220", email: "mm@couture.com" }
    },
    {
        name: "Nalli Silks",
        category: "Bridal Wear",
        city: "Chennai",
        price: 50000,
        rating: 4.6,
        image: images.bridal[2],
        description: "Authentic Kanchipuram silk sarees.",
        contact_info: { phone: "9876543221", email: "info@nalli.com" }
    },

    // --- GROOM WEAR ---
    {
        name: "Manyavar Mohey",
        category: "Groom Wear",
        city: "Delhi",
        price: 40000,
        rating: 4.5,
        image: images.groom[0],
        description: "Traditional Sherwanis and Kurtas for grooms.",
        contact_info: { phone: "9876543222", email: "support@manyavar.com" }
    },
    {
        name: "Raymond Fine Fabrics",
        category: "Groom Wear",
        city: "Mumbai",
        price: 25000,
        rating: 4.4,
        image: images.groom[1],
        description: "Custom tailored suits and tuxedos.",
        contact_info: { phone: "9876543223", email: "store@raymond.com" }
    },
    {
        name: "Raghavendra Rathore",
        category: "Groom Wear",
        city: "Jodhpur",
        price: 120000,
        rating: 4.8,
        image: images.groom[2],
        description: "Classic Jodhpuris and Bandhgalas.",
        contact_info: { phone: "9876543224", email: "rr@rathore.com" }
    },

    // --- MEHNDI ---
    {
        name: "Veena Nagda",
        category: "Mehndi",
        city: "Mumbai",
        price: 15000,
        rating: 4.9,
        image: images.mehndi[0],
        description: "Bollywood's favorite Mehndi artist.",
        contact_info: { phone: "9876543225", email: "veena@nagda.com" }
    },
    {
        name: "Raju Mehandi Art",
        category: "Mehndi",
        city: "Delhi",
        price: 8000,
        rating: 4.5,
        image: images.mehndi[1],
        description: "Intricate bridal mehndi designs.",
        contact_info: { phone: "9876543226", email: "raju@mehandi.com" }
    },
    {
        name: "Alankrita Art",
        category: "Mehndi",
        city: "Pune",
        price: 5000,
        rating: 4.2,
        image: images.mehndi[2],
        description: "Modern and Arabic mehndi styles.",
        contact_info: { phone: "9876543227", email: "alan@krita.com" }
    },

    // --- CATERING ---
    {
        name: "Foodlink Catering",
        category: "Catering",
        city: "Mumbai",
        price: 2500,
        rating: 4.8,
        image: images.catering[0],
        description: "Luxury catering with global cuisines.",
        contact_info: { phone: "9876543228", email: "info@foodlink.com" }
    },
    {
        name: "The Kitchen Art",
        category: "Catering",
        city: "Delhi",
        price: 1800,
        rating: 4.6,
        image: images.catering[1],
        description: "Authentic North Indian and Mughlai spreads.",
        contact_info: { phone: "9876543229", email: "kitchen@art.com" }
    },
    {
        name: "Maharaja Bhog",
        category: "Catering",
        city: "Ahmedabad",
        price: 1200,
        rating: 4.5,
        image: images.catering[2],
        description: "Premium vegetarian thali experiences.",
        contact_info: { phone: "9876543230", email: "maharaja@bhog.com" }
    },

    // --- DECORATION ---
    {
        name: "Ferns N Petals Decor",
        category: "Decoration",
        city: "Delhi",
        price: 150000,
        rating: 4.4,
        image: images.decoration[0],
        description: "Floral arrangements and stage decor.",
        contact_info: { phone: "9876543231", email: "decor@fnp.com" }
    },
    {
        name: "The Wedding Design Co",
        category: "Decoration",
        city: "Mumbai",
        price: 500000,
        rating: 4.9,
        image: images.decoration[1],
        description: "Grand sets and thematic wedding decor.",
        contact_info: { phone: "9876543232", email: "vandana@wdc.com" }
    },
    {
        name: "Altair Decor",
        category: "Decoration",
        city: "Bangalore",
        price: 200000,
        rating: 4.7,
        image: images.decoration[2],
        description: "Modern, chic, and sustainable decor.",
        contact_info: { phone: "9876543233", email: "info@altair.com" }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing data to avoid duplicates
        await Vendor.deleteMany({});
        console.log("🗑️  Cleared existing vendors");

        // Insert new data
        await Vendor.insertMany(vendors);
        console.log("🎉 Successfully added 24 vendors (3 per category)!");

        process.exit();
    } catch (err) {
        console.error("❌ Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();