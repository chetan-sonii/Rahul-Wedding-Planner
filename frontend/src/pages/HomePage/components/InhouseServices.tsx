import { motion } from "framer-motion";
import { Link } from "react-router"; // or 'react-router-dom'

// Mock Data Structure
const services = [
    {
        id: 1,
        title: "Wedsta",
        subtitle: "WMG At Home, Family Makeup Services",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/wedsta_dweb.jpg",
        link: "/services/wedsta"
    },
    {
        id: 2,
        title: "Genie Services",
        subtitle: "Plan your wedding with an expert",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/genie_dweb.jpg", // Replace with valid URL if needed
        link: "/services/genie"
    },
    {
        id: 3,
        title: "Venue Booking",
        subtitle: "Best prices guaranteed",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/venue_dweb.jpg", // Replace with valid URL if needed
        link: "/services/venue"
    },
    {
        id: 4,
        title: "Photoshoot",
        subtitle: "Pre-wedding & Candid Photography",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/photoshoot_dweb.jpg", // Replace with valid URL if needed
        link: "/services/photoshoot"
    }
];

const InhouseServices = () => {
    return (
        <section className="w-full bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 font-heading">
                        WMG Inhouse Services
                    </h2>
                    <p className="text-gray-500 mt-2 font-sans">Premium services curated just for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} data={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Extracted Card Component for cleaner code
const ServiceCard = ({ data }: { data: typeof services[0] }) => {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Image Container */}
            <div className="h-64 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <img
                    src={data.image}
                    alt={data.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 font-heading mb-2">
                    {data.title}
                </h3>
                <p className="text-gray-500 font-sans mb-6">
                    {data.subtitle}
                </p>

                <Link
                    to={data.link}
                    className="inline-block px-8 py-3 border border-pink-500 text-pink-600 font-medium rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 font-sans uppercase text-sm tracking-wider"
                >
                    Know More
                </Link>
            </div>
        </motion.div>
    );
};

export default InhouseServices;