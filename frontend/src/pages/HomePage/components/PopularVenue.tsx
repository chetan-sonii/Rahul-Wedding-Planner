import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, Variants } from 'framer-motion';

import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import {AxiosClient} from "../../../config/axiosClient.ts";

// Interface matching Backend Data
interface Venue {
    _id: string;
    name: string;
    category: string;
    image: string;
    city: string;
    rating: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const PopularVenue = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                // Fetch from the new public endpoint
                const res = await AxiosClient.get('/public/homepage');
                setVenues(res.data.data.popularVenues);
            } catch (error) {
                console.error("Failed to fetch venues", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 font-heading">
                            Popular Top Rated Venues
                        </h2>
                        <p className="text-gray-500 mt-2 font-sans">
                            Explore the highest rated wedding locations
                        </p>
                    </div>
                    <Link
                        to="/vendors?category=Venue"
                        className="text-pink-600 font-medium hover:text-pink-700 transition-colors mt-4 md:mt-0 font-sans"
                    >
                        View All Venues &rarr;
                    </Link>
                </div>

                {/* Grid Layout */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {venues.map((venue) => (
                            <motion.div
                                key={venue._id}
                                variants={itemVariants}
                                className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                            >
                                {/* Image Area */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={venue.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={venue.name}
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${venue.name}` }}
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-gray-800 shadow-sm">
                                        <FaStar className="text-yellow-400" /> {venue.rating}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors font-heading mb-1 line-clamp-1">
                                        {venue.name}
                                    </h3>

                                    <div className="flex items-center text-sm text-gray-500 mb-4 font-sans">
                                        <FaMapMarkerAlt className="mr-1 text-gray-400" /> {venue.city}
                                    </div>

                                    <div className="mt-auto">
                                        <Link
                                            to={`/vendors?city=${venue.city}&category=Venue`}
                                            className="text-xs font-semibold text-pink-500 uppercase tracking-wide hover:underline font-sans"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PopularVenue;