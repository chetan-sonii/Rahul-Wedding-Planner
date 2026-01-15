import { motion } from 'framer-motion';
import { Link } from 'react-router';

// Interfaces
interface CategoryItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    color: string;
    link: string;
}

const categories: CategoryItem[] = [
    {
        id: 1,
        title: "Venues",
        subtitle: "Banquet Halls, Lawns, Resorts",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/venues.jpg",
        color: "bg-blue-50 hover:bg-blue-100",
        link: "/vendors?category=Venue"
    },
    {
        id: 2,
        title: "Photographers",
        subtitle: "Candid, Cinematic, Pre-wedding",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/2/photographers.jpg",
        color: "bg-pink-50 hover:bg-pink-100",
        link: "/vendors?category=Photographer"
    },
    {
        id: 3,
        title: "Makeup",
        subtitle: "Bridal, Family, Party Makeup",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/3/makeup.jpg",
        color: "bg-orange-50 hover:bg-orange-100",
        link: "/vendors?category=Makeup"
    },
    {
        id: 4,
        title: "Bridal Wear",
        subtitle: "Lehengas, Sarees, Gowns",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/4/bridal-wear.jpg",
        color: "bg-purple-50 hover:bg-purple-100",
        link: "/vendors?category=Bridal Wear"
    },
    {
        id: 5,
        title: "Groom Wear",
        subtitle: "Sherwani, Suits, Tuxedos",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/5/groom-wear.jpg",
        color: "bg-green-50 hover:bg-green-100",
        link: "/vendors?category=Groom Wear"
    },
    {
        id: 6,
        title: "Mehndi",
        subtitle: "Bridal Mehndi, Guest Mehndi",
        image: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/6/mehndi.jpg",
        color: "bg-yellow-50 hover:bg-yellow-100",
        link: "/vendors?category=Mehndi"
    }
];

const WeddingCategories = () => {
    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800">Wedding Categories</h2>
                    <p className="text-gray-500 mt-3 font-sans max-w-2xl mx-auto">
                        From venues to photographers, find everything you need to plan your perfect day in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, index) => (
                        <Link to={cat.link} key={cat.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`${cat.color} flex items-center justify-between p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-gray-200`}
                            >
                                <div className="flex-1 pr-4">
                                    <h3 className="text-2xl font-bold text-gray-800 font-heading mb-1 group-hover:text-primary transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-sans leading-relaxed">
                                        {cat.subtitle}
                                    </p>
                                </div>

                                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl shadow-inner bg-white">
                                    <img
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        src={cat.image}
                                        alt={cat.title}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/150?text=${cat.title}`
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

export default WeddingCategories;