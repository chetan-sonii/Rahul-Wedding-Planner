import { motion } from 'framer-motion';
import { Link } from 'react-router';

// Interfaces
interface SearchItem {
    label: string;
    image: string;
    link: string;
}

const searches: SearchItem[] = [
    {
        label: "Wedding Photographers",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/3/photography.jpg",
        // Update link to filter by category
        link: "/vendors?category=Photographer"
    },
    {
        label: "Bridal Makeup",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/2/makeup.jpg",
        link: "/vendors?category=Makeup"
    },
    {
        label: "Pre Wedding Shoot",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/4/pre-wedding.jpg",
        // Map to Photographer if no specific category exists, or add new category
        link: "/vendors?category=Photographer&search=Pre-wedding"
    },
    {
        label: "Destination Weddings",
        image: "https://image.wedmegood.com/resized/300X/uploads/banner_image/1/destination.jpg",
        link: "/vendors?category=Venue"
    }
];

const PopularSearch = () => {
    return (
        <section className="w-full bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-3xl font-bold font-heading text-gray-800">
                        Popular Searches
                    </h2>
                    <p className="text-gray-500 mt-2">Most requested services by couples</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {searches.map((item, i) => (
                        <Link to={item.link} key={i} className="block group">
                            <motion.div
                                className="overflow-hidden rounded-2xl relative aspect-[3/4] shadow-sm border border-gray-100"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={item.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={item.label}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/300x400?text=Category"
                                    }}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white font-bold font-heading text-lg group-hover:text-pink-200 transition-colors">
                                        {item.label}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PopularSearch;