import { Link } from 'react-router';
import { motion, Variants } from 'framer-motion'; // 1. Added 'Variants' import

// Mock data
const venues = [
    {
        id: 1,
        category: "4 Star Hotels",
        image: "https://image.wedmegood.com/resized/300X/uploads/option_image/63/banquet-halls.png",
        locations: ["Mumbai", "Bangalore", "Goa"],
        link: "/venues/hotels"
    },
    {
        id: 2,
        category: "Banquet Halls",
        image: "https://image.wedmegood.com/resized/300X/uploads/option_image/64/resort.png",
        locations: ["Delhi NCR", "Chandigarh"],
        link: "/venues/banquets"
    },
    {
        id: 3,
        category: "Destination Resorts",
        image: "https://image.wedmegood.com/resized/300X/uploads/option_image/66/lawn.png",
        locations: ["Udaipur", "Jaipur", "Kerala"],
        link: "/venues/resorts"
    }
];

// 2. Explicitly typed the variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const PopularVenue = () => {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 font-heading">
                            Popular Venue Searches
                        </h2>
                        <p className="text-gray-500 mt-2 font-sans">
                            Explore the most trending wedding locations
                        </p>
                    </div>
                    <Link
                        to="/venues"
                        className="text-pink-600 font-medium hover:text-pink-700 transition-colors mt-4 md:mt-0 font-sans"
                    >
                        View All Categories &rarr;
                    </Link>
                </div>

                {/* Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {venues.map((venue) => (
                        <motion.div
                            key={venue.id}
                            variants={itemVariants}
                            className="group flex items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                    src={venue.image}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    alt={venue.category}
                                />
                            </div>

                            <div className="ml-5 flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors font-heading">
                                    {venue.category}
                                </h3>

                                <div className="flex flex-wrap gap-2 mt-1 mb-2 text-sm text-gray-500 font-sans">
                                    {venue.locations.map((loc, idx) => (
                                        <span key={idx}>
                      {loc}{idx < venue.locations.length - 1 && ","}
                    </span>
                                    ))}
                                </div>

                                <Link
                                    to={venue.link}
                                    className="text-xs font-semibold text-pink-500 uppercase tracking-wide hover:underline font-sans"
                                >
                                    Explore Locations
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularVenue;