import { motion } from 'framer-motion';
import { Link } from 'react-router';

const searches = [
    {
        label: "Wedding Photographers",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/3/photography.jpg",
        link: "/search/photographers"
    },
    {
        label: "Bridal Makeup",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/2/makeup.jpg", // Replace with valid URL
        link: "/search/makeup"
    },
    {
        label: "Pre Wedding Shoot",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/4/pre-wedding.jpg", // Replace with valid URL
        link: "/search/pre-wedding"
    },
    {
        label: "Destination Weddings",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/1/destination.jpg", // Replace with valid URL
        link: "/search/destination"
    }
];

const PopularSearch = () => {
    return (
        <section className="w-full bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-2xl font-bold font-heading text-gray-800 mb-8">
                    Popular Searches
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {searches.map((item, i) => (
                        <Link to={item.link} key={i} className="block group">
                            <motion.div
                                className="overflow-hidden rounded-lg relative aspect-[3/4] shadow-sm"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={item.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt={item.label}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x400?text=Category"
                                    }}
                                />
                                {/* Gradient Overlay for better contrast if we put text on top,
                                but here we keep text below for cleanliness */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </motion.div>

                            <p className="mt-3 text-center text-gray-700 font-medium font-sans group-hover:text-pink-600 transition-colors">
                                {item.label}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PopularSearch