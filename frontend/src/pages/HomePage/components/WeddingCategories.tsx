import { motion } from 'framer-motion';
import { Link } from 'react-router'; // Check if you use 'react-router-dom'

// 1. Mock Data with specific colors for variety
const categories = [
    {
        id: 1,
        title: "Venues",
        subtitle: "Banquet Halls, Lawns, Resorts",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/venues.jpg",
        color: "bg-blue-50", // Light pastel background
        link: "/vendors/venues"
    },
    {
        id: 2,
        title: "Photographers",
        subtitle: "Candid, Cinematic, Pre-wedding",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/2/photographers.jpg", // Replace with valid URL
        color: "bg-pink-50",
        link: "/vendors/photographers"
    },
    {
        id: 3,
        title: "Makeup",
        subtitle: "Bridal, Family, Party Makeup",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/3/makeup.jpg", // Replace with valid URL
        color: "bg-orange-50",
        link: "/vendors/makeup"
    },
    {
        id: 4,
        title: "Bridal Wear",
        subtitle: "Lehengas, Sarees, Gowns",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/4/bridal-wear.jpg", // Replace with valid URL
        color: "bg-purple-50",
        link: "/vendors/bridal-wear"
    },
    {
        id: 5,
        title: "Groom Wear",
        subtitle: "Sherwani, Suits, Tuxedos",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/5/groom-wear.jpg", // Replace with valid URL
        color: "bg-green-50",
        link: "/vendors/groom-wear"
    },
    {
        id: 6,
        title: "Mehndi",
        subtitle: "Bridal Mehndi, Guest Mehndi",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/6/mehndi.jpg", // Replace with valid URL
        color: "bg-yellow-50",
        link: "/vendors/mehndi"
    }
];

const WeddingCategories = () => {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold font-heading text-gray-800">Wedding Categories</h2>
                    <p className="text-gray-500 font-sans">Everything you need for your big day</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {categories.map((cat, index) => (
                        <Link to={cat.link} key={cat.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`${cat.color} flex items-center justify-between p-6 rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-300 group`}
                            >
                                <div className="flex-1 pr-4">
                                    <h3 className="text-2xl font-bold text-gray-800 font-heading mb-1 group-hover:text-pink-600 transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-sans">
                                        {cat.subtitle}
                                    </p>
                                </div>

                                <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                                    <img
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        src={cat.image}
                                        alt={cat.title}
                                        // Fallback for broken images if you don't have all URLs yet
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=No+Image"
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WeddingCategories