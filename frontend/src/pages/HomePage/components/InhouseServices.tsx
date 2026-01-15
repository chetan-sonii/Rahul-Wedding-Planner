import { motion } from "framer-motion";
import { Link } from "react-router";

// 1. Define Interface
interface ServiceItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    link: string;
}

// 2. Updated Data with Functional Links
const services: ServiceItem[] = [
    {
        id: 1,
        title: "SubhVivah Styling",
        subtitle: "Premium Family Makeup Services",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/wedsta_dweb.jpg",
        link: "/vendors?category=Makeup" // Linked to Makeup Vendors
    },
    {
        id: 2,
        title: "Wedding Genie",
        subtitle: "Expert Wedding Planning Assistance",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/genie_dweb.jpg",
        link: "/contact" // Linked to Contact Page for "Genie" service
    },
    {
        id: 3,
        title: "Venue Concierge",
        subtitle: "Best Prices Guaranteed on Venues",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/venue_dweb.jpg",
        link: "/vendors?category=Venue" // Linked to Venues
    },
    {
        id: 4,
        title: "Capture Moments",
        subtitle: "Pre-wedding & Candid Photography",
        image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/photoshoot_dweb.jpg",
        link: "/vendors?category=Photographer" // Linked to Photographers
    }
];

const InhouseServices = () => {
    return (
        <section className="w-full bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-heading">
                        SubhVivah Premium Services
                    </h2>
                    <p className="text-gray-500 mt-2 font-sans text-lg">
                        Exclusive services curated just for your special day
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} data={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Extracted Card Component
const ServiceCard = ({ data }: { data: ServiceItem }) => {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            {/* Image Container with Overlay */}
            <div className="h-72 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                <img
                    src={data.image}
                    alt={data.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${data.title}`
                    }}
                />

                {/* Text Overlay on Image (Mobile Friendly) */}
                <div className="absolute bottom-6 left-6 z-20 text-white">
                    <h3 className="text-2xl font-bold font-heading mb-1 shadow-black drop-shadow-md">
                        {data.title}
                    </h3>
                    <p className="text-gray-200 font-sans text-sm font-medium">
                        {data.subtitle}
                    </p>
                </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 flex justify-between items-center bg-white">
                <span className="text-gray-500 text-sm font-medium">Starting from ₹15,000</span>
                <Link
                    to={data.link}
                    className="inline-block px-6 py-2.5 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm tracking-wide"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default InhouseServices;