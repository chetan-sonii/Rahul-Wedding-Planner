require("dotenv").config();
const mongoose = require("mongoose");
const Vendor = require("./src/models/Vendor.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Rahul_Wedding_Planner";

// --- UNIQUE REALISTIC DATA PER CITY ---

const CITY_DATA = {
    "Mumbai": {
        venue: {
            name: "Taj Lands End",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            desc: "Overlooking the Arabian Sea, this luxury hotel offers the perfect blend of seaside charm and opulence.",
            price: 600000
        },
        vendors: {
            "Photographer": [
                { name: "The Bombay Brigade", price: 150000, img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80" },
                { name: "Candid Shutters Mumbai", price: 120000, img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80" }
            ],
            "Makeup": [
                { name: "Ojas Rajani", price: 50000, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" },
                { name: "Varsha Gidwani", price: 35000, img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80" }
            ],
            "Bridal Wear": [
                { name: "Manish Malhotra World", price: 450000, img: "https://images.unsplash.com/photo-1594513297252-7e99738f6f55?auto=format&fit=crop&w=800&q=80" },
                { name: "Kalki Fashion", price: 80000, img: "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80" }
            ],
            "Groom Wear": [
                { name: "Raymond Made to Measure", price: 40000, img: "https://images.unsplash.com/photo-1593032465175-d81f0f53d35b?auto=format&fit=crop&w=800&q=80" },
                { name: "Telon Men", price: 65000, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" }
            ],
            "Mehndi": [
                { name: "Veena Nagda", price: 25000, img: "https://images.unsplash.com/photo-1569254994521-dd681aef11f1?auto=format&fit=crop&w=800&q=80" },
                { name: "Geeta Patel Mehndi", price: 12000, img: "https://images.unsplash.com/photo-1620164667958-3729f271295b?auto=format&fit=crop&w=800&q=80" }
            ],
            "Catering": [
                { name: "Foodlink Luxury Catering", price: 3500, img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
                { name: "Mini Punjab", price: 1800, img: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80" }
            ],
            "Decoration": [
                { name: "The Wedding Design Company", price: 500000, img: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=800&q=80" },
                { name: "Dreamzkraft", price: 300000, img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80" }
            ]
        }
    },
    "Delhi": {
        venue: {
            name: "The Umrao",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
            desc: "A boutique hotel located on NH-8, offering lush green lawns and a palace-like backdrop.",
            price: 450000
        },
        vendors: {
            "Photographer": [
                { name: "Delhi Velvets", price: 140000, img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80" },
                { name: "Safarnama Films", price: 110000, img: "https://images.unsplash.com/photo-1559582930-bb01d5e5c9b3?auto=format&fit=crop&w=800&q=80" }
            ],
            "Makeup": [
                { name: "Parul Garg", price: 45000, img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80" },
                { name: "Guneet Virdi", price: 55000, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80" }
            ],
            "Bridal Wear": [
                { name: "Om Prakash Jawahar Lal", price: 150000, img: "https://images.unsplash.com/photo-1610173827002-6b4e96803151?auto=format&fit=crop&w=800&q=80" },
                { name: "Dolly J Studio", price: 250000, img: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?auto=format&fit=crop&w=800&q=80" }
            ],
            "Groom Wear": [
                { name: "Manyavar", price: 35000, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
                { name: "Diwan Saheb", price: 85000, img: "https://images.unsplash.com/photo-1617137968427-b2e4241e21b0?auto=format&fit=crop&w=800&q=80" }
            ],
            "Mehndi": [
                { name: "Raju Mehandi Wala", price: 15000, img: "https://images.unsplash.com/photo-1596230529625-7ee541fb331c?auto=format&fit=crop&w=800&q=80" },
                { name: "Kundan Mehndi", price: 8000, img: "https://images.unsplash.com/photo-1551024601-564a51e6b36e?auto=format&fit=crop&w=800&q=80" }
            ],
            "Catering": [
                { name: "The Kitchen Art", price: 2200, img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
                { name: "Feeding Concepts", price: 2800, img: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=800&q=80" }
            ],
            "Decoration": [
                { name: "Ferns N Petals", price: 250000, img: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=800&q=80" },
                { name: "Inch Perfection", price: 180000, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80" }
            ]
        }
    },
    "Bangalore": {
        venue: {
            name: "The Tamarind Tree",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
            desc: "A magical heritage hideaway with antique doorways, pavilions, and lush green gardens.",
            price: 350000
        },
        vendors: {
            "Photographer": [
                { name: "Vivek Krishnan Photography", price: 120000, img: "https://images.unsplash.com/photo-1609127102567-02058c49e29a?auto=format&fit=crop&w=800&q=80" },
                { name: "LightBucket Productions", price: 110000, img: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&w=800&q=80" }
            ],
            "Makeup": [
                { name: "Kulsum Parvez", price: 30000, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80" },
                { name: "Zorains Studio", price: 25000, img: "https://images.unsplash.com/photo-1455686950540-8f054f5a8685?auto=format&fit=crop&w=800&q=80" }
            ],
            "Bridal Wear": [
                { name: "Koskii", price: 60000, img: "https://images.unsplash.com/photo-1550614000-4b9519e0034a?auto=format&fit=crop&w=800&q=80" },
                { name: "Armadio", price: 120000, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80" }
            ],
            "Groom Wear": [
                { name: "108 Bespoke", price: 45000, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80" },
                { name: "P N RAO", price: 35000, img: "https://images.unsplash.com/photo-1559582930-bb01d5e5c9b3?auto=format&fit=crop&w=800&q=80" }
            ],
            "Mehndi": [
                { name: "Pushpa Mehndi Arts", price: 6000, img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80" },
                { name: "North Indian Mehndi", price: 4000, img: "https://images.unsplash.com/photo-1574269859262-1132640237da?auto=format&fit=crop&w=800&q=80" }
            ],
            "Catering": [
                { name: "Sagar Caterers", price: 900, img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
                { name: "Bhandarys Kitchen", price: 1200, img: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=800&q=80" }
            ],
            "Decoration": [
                { name: "With Love Nilma", price: 200000, img: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=800&q=80" },
                { name: "Taarini Weddings", price: 150000, img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80" }
            ]
        }
    },
    "Udaipur": {
        venue: {
            name: "The Oberoi Udaivilas",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
            desc: "A palatial resort offering views of Lake Pichola, featuring domes, walkways, and a royal ambiance.",
            price: 1500000
        },
        vendors: {
            "Photographer": [
                { name: "Weddingrams", price: 180000, img: "https://images.unsplash.com/photo-1628198751508-b807095034c2?auto=format&fit=crop&w=800&q=80" },
                { name: "Oragraphy", price: 160000, img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80" }
            ],
            "Makeup": [
                { name: "Pinky Visal", price: 30000, img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80" },
                { name: "Simran Tak", price: 20000, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" }
            ],
            "Bridal Wear": [
                { name: "Swati Ubroi", price: 180000, img: "https://images.unsplash.com/photo-1594513297252-7e99738f6f55?auto=format&fit=crop&w=800&q=80" },
                { name: "Rana's by Kshitija", price: 80000, img: "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80" }
            ],
            "Groom Wear": [
                { name: "Kora by NM", price: 55000, img: "https://images.unsplash.com/photo-1593032465175-d81f0f53d35b?auto=format&fit=crop&w=800&q=80" },
                { name: "Mohanlal Sons", price: 30000, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" }
            ],
            "Mehndi": [
                { name: "Hansa Gajjar", price: 15000, img: "https://images.unsplash.com/photo-1569254994521-dd681aef11f1?auto=format&fit=crop&w=800&q=80" },
                { name: "Udaipur Mehndi Art", price: 5000, img: "https://images.unsplash.com/photo-1620164667958-3729f271295b?auto=format&fit=crop&w=800&q=80" }
            ],
            "Catering": [
                { name: "Neelabh Kapoor Catering", price: 4000, img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
                { name: "Local Rajasthani Rasoi", price: 1500, img: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80" }
            ],
            "Decoration": [
                { name: "New Rajneesh Decorators", price: 200000, img: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=800&q=80" },
                { name: "Event Entourage", price: 350000, img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80" }
            ]
        }
    }
};

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await Vendor.deleteMany({});
        console.log("🗑️  Cleared existing vendors");

        const allVendors = [];

        for (const [cityName, data] of Object.entries(CITY_DATA)) {
            // 1. Create Venue
            allVendors.push({
                name: data.venue.name,
                category: "Venue",
                city: cityName,
                price: data.venue.price,
                rating: 4.8,
                image: data.venue.image,
                description: data.venue.desc,
                contact_info: { email: `info@${data.venue.name.split(' ')[0].toLowerCase()}.com`, phone: `+91 ${Math.floor(Math.random() * 9000000000)}` }
            });

            // 2. Create Vendors for each category
            for (const [catName, vendorList] of Object.entries(data.vendors)) {
                vendorList.forEach(v => {
                    allVendors.push({
                        name: v.name,
                        category: catName,
                        city: cityName,
                        price: v.price,
                        rating: 4.0 + (Math.random()), // Random rating 4.0 - 5.0
                        image: v.img,
                        description: `Premium ${catName} services by ${v.name}. Professional and experienced in ${cityName} weddings.`,
                        contact_info: { email: `contact@${v.name.split(' ')[0].toLowerCase()}.com`, phone: `+91 ${Math.floor(Math.random() * 9000000000)}` }
                    });
                });
            }
        }

        await Vendor.insertMany(allVendors);
        console.log(`🎉 Successfully added ${allVendors.length} Unique Vendors across 4 Cities!`);
        console.log(`   - 4 Venues (1 per city)`);
        console.log(`   - 14 Vendors per city (2 per category)`);

        process.exit();
    } catch (err) {
        console.error("❌ Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();