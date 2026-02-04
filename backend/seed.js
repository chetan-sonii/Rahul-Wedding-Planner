require("dotenv").config();
const mongoose = require("mongoose");
const Vendor = require("./src/models/Vendor.model"); // Ensure path is correct

// Use your Mongo URI from .env
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Rahul_Wedding_Planner";

const vendors = [
    // --- VENUE (Rich Content) ---
    {
        name: "The Royal Oberoi Palace",
        category: "Venue",
        city: "Udaipur",
        price: 500000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
        description: "Experience the grandeur of Rajasthan with our heritage property. Featuring a lakeside view, 3 sprawling lawns, and a banquet hall with a capacity of 1000 guests. Perfect for destination weddings.",
        contact_info: { email: "events@oberoi-udaipur.com", phone: "+91 98290 12345" }
    },
    {
        name: "Grand Hyatt Ballroom",
        category: "Venue",
        city: "Mumbai",
        price: 350000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "A modern luxury venue in the heart of Mumbai. Fully air-conditioned crystal ballroom with state-of-the-art lighting and sound systems. Includes 5-star catering services.",
        contact_info: { email: "weddings@hyattmumbai.com", phone: "+91 22 6655 4433" }
    },
    {
        name: "Green Meadows Resort",
        category: "Venue",
        city: "Bangalore",
        price: 250000,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        description: "Lush green open-air venue perfect for sunset weddings. Offers 12 premium cottages for guest stay and a dedicated mandap area under the banyan tree.",
        contact_info: { email: "book@greenmeadows.com", phone: "+91 80 1234 5678" }
    },

    // --- PHOTOGRAPHER ---
    {
        name: "Stories by Joseph",
        category: "Photographer",
        city: "Goa",
        price: 150000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
        description: "Specializing in candid and cinematic wedding films. We capture the raw emotions and unseen moments of your big day.",
        contact_info: { email: "joe@stories.com", phone: "+91 98765 11111" }
    },
    {
        name: "The Wedding Salad",
        category: "Photographer",
        city: "Delhi",
        price: 120000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
        description: "A team of artistic photographers who believe in storytelling. Package includes pre-wedding shoot and a premium photo album.",
        contact_info: { email: "hello@weddingsalad.com", phone: "+91 99887 76655" }
    },
    {
        name: "Pixel Perfect Studios",
        category: "Photographer",
        city: "Bangalore",
        price: 80000,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
        description: "Traditional and candid photography services at affordable rates. We deliver high-resolution edited images within 2 weeks.",
        contact_info: { email: "info@pixelperfect.com", phone: "+91 91234 56789" }
    },

    // --- MAKEUP ---
    {
        name: "Ojas Rajani Makeup",
        category: "Makeup",
        city: "Mumbai",
        price: 45000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
        description: "Celebrity makeup artist known for the signature 'Glass Skin' look. Uses premium international brands like Charlotte Tilbury and MAC.",
        contact_info: { email: "ojas@makeup.com", phone: "+91 98200 98200" }
    },
    {
        name: "Parul Garg Studio",
        category: "Makeup",
        city: "Delhi",
        price: 35000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
        description: "HD and Airbrush makeup specialist. We ensure your makeup stays flawless for 12+ hours.",
        contact_info: { email: "parul@garg.com", phone: "+91 98100 98100" }
    },
    {
        name: "Glam by Sneha",
        category: "Makeup",
        city: "Pune",
        price: 20000,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
        description: "Mobile makeup artist available for venue visits. Specializes in subtle and natural bridal looks.",
        contact_info: { email: "sneha@glam.com", phone: "+91 99220 99220" }
    },

    // --- BRIDAL WEAR ---
    {
        name: "Sabyasachi Couture",
        category: "Bridal Wear",
        city: "Kolkata",
        price: 400000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1594513297252-7e99738f6f55?auto=format&fit=crop&w=800&q=80",
        description: "The dream of every Indian bride. Handcrafted heritage lehengas with intricate zardosi work.",
        contact_info: { email: "store@sabyasachi.com", phone: "+91 33 2288 9900" }
    },
    {
        name: "Manish Malhotra",
        category: "Bridal Wear",
        city: "Mumbai",
        price: 350000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1610173827002-6b4e96803151?auto=format&fit=crop&w=800&q=80",
        description: "Contemporary sequins and glamour. Perfect for your Sangeet and Reception nights.",
        contact_info: { email: "mm@couture.com", phone: "+91 22 6677 8899" }
    },
    {
        name: "Nalli Silks",
        category: "Bridal Wear",
        city: "Chennai",
        price: 50000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80",
        description: "Authentic pure Zari Kanchipuram silk sarees sourced directly from weavers.",
        contact_info: { email: "info@nalli.com", phone: "+91 44 2434 4115" }
    },

    // --- GROOM WEAR ---
    {
        name: "Manyavar Mohey",
        category: "Groom Wear",
        city: "Delhi",
        price: 40000,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593032465175-d81f0f53d35b?auto=format&fit=crop&w=800&q=80",
        description: "One stop shop for Sherwanis, Kurtas, and Indo-western outfits for the groom.",
        contact_info: { email: "support@manyavar.com", phone: "1800 123 456" }
    },
    {
        name: "Raymond Fine Fabrics",
        category: "Groom Wear",
        city: "Mumbai",
        price: 25000,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        description: "Bespoke tailoring services for Tuxedos and three-piece suits.",
        contact_info: { email: "custom@raymond.com", phone: "+91 22 4000 5000" }
    },
    {
        name: "Raghavendra Rathore",
        category: "Groom Wear",
        city: "Jodhpur",
        price: 120000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1559582930-bb01d5e5c9b3?auto=format&fit=crop&w=800&q=80",
        description: "Classic Jodhpuris and Bandhgalas that exude royal elegance.",
        contact_info: { email: "studio@rathore.com", phone: "+91 291 254 5678" }
    },

    // --- MEHNDI ---
    {
        name: "Veena Nagda",
        category: "Mehndi",
        city: "Mumbai",
        price: 15000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1569254994521-dd681aef11f1?auto=format&fit=crop&w=800&q=80",
        description: "Bollywood's favorite Mehndi artist. Known for speed and intricate bridal figures.",
        contact_info: { email: "veena@nagda.com", phone: "+91 98210 12345" }
    },
    {
        name: "Raju Mehandi Art",
        category: "Mehndi",
        city: "Delhi",
        price: 8000,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1620164667958-3729f271295b?auto=format&fit=crop&w=800&q=80",
        description: "Specialist in Marwari and Arabic Mehndi designs using organic henna.",
        contact_info: { email: "raju@mehandi.com", phone: "+91 98111 22233" }
    },
    {
        name: "Alankrita Art",
        category: "Mehndi",
        city: "Pune",
        price: 5000,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1596230529625-7ee541fb331c?auto=format&fit=crop&w=800&q=80",
        description: "Budget-friendly packages for the entire bridal party and guests.",
        contact_info: { email: "alan@krita.com", phone: "+91 99234 56789" }
    },

    // --- CATERING ---
    {
        name: "Foodlink Catering",
        category: "Catering",
        city: "Mumbai",
        price: 2500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
        description: "Luxury catering with live counters, global cuisines, and impeccable service.",
        contact_info: { email: "info@foodlink.com", phone: "+91 22 2888 7777" }
    },
    {
        name: "The Kitchen Art",
        category: "Catering",
        city: "Delhi",
        price: 1800,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80",
        description: "Authentic North Indian and Mughlai spreads. Famous for our Butter Chicken and Dal Makhani.",
        contact_info: { email: "kitchen@art.com", phone: "+91 98100 54321" }
    },
    {
        name: "Maharaja Bhog",
        category: "Catering",
        city: "Ahmedabad",
        price: 1200,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
        description: "Premium pure vegetarian thali experiences. Ideal for traditional weddings.",
        contact_info: { email: "sales@maharajabhog.com", phone: "+91 79 2640 1234" }
    },

    // --- DECORATION ---
    {
        name: "Ferns N Petals Decor",
        category: "Decoration",
        city: "Delhi",
        price: 150000,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=800&q=80",
        description: "Experts in floral arrangements, mandap decor, and theme-based styling.",
        contact_info: { email: "decor@fnp.com", phone: "+91 11 4567 8900" }
    },
    {
        name: "The Wedding Design Co",
        category: "Decoration",
        city: "Mumbai",
        price: 500000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=800&q=80",
        description: "Creating larger-than-life sets and immersive experiences for luxury weddings.",
        contact_info: { email: "vandana@wdc.com", phone: "+91 22 2600 5000" }
    },
    {
        name: "Altair Decor",
        category: "Decoration",
        city: "Bangalore",
        price: 200000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
        description: "Sustainable and eco-friendly wedding decor solutions with a chic modern aesthetic.",
        contact_info: { email: "info@altair.com", phone: "+91 80 4000 3000" }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await Vendor.deleteMany({});
        console.log("🗑️  Cleared existing vendors");

        await Vendor.insertMany(vendors);
        console.log("🎉 Successfully added 24 Vendors with real images and contact info!");

        process.exit();
    } catch (err) {
        console.error("❌ Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();