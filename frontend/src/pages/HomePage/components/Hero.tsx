import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">

            {/* Background Image with Parallax-like fixed feel (optional) or just cover */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: 'url("https://image.wedmegood.com/resized/1900X/uploads/city_bg_image/1/delhi_bg.jpeg")' }}
            >
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading drop-shadow-md tracking-tight">
                        Plan your Dream Wedding
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 font-sans font-light">
                        Find the best vendors, venues, and services in <span className="font-semibold text-white">Delhi NCR</span>
                    </p>
                </motion.div>

                {/* Search Bar Container */}
                <motion.div
                    className="mt-8 flex flex-col md:flex-row items-center justify-center w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="flex w-full md:w-2/3 bg-white rounded-full overflow-hidden shadow-2xl p-1 border border-gray-200 focus-within:ring-2 focus-within:ring-pink-300 transition-all">

                        {/* Input Field */}
                        <input
                            type="text"
                            className="flex-grow px-6 py-4 text-gray-700 outline-none placeholder:text-gray-400 font-sans"
                            placeholder="Search for 'Photographers', 'Venues'..."
                        />

                        {/* Search Button */}
                        <button className="bg-primary hover:bg-pink-700 text-white rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2">
                            <CiSearch className="text-xl" />
                            <span className="hidden md:inline font-sans">Search</span>
                        </button>
                    </div>
                </motion.div>

                {/* Quick Tags (Optional UX enhancement) */}
                <motion.div
                    className="mt-6 flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {["Venues", "Makeup Artists", "Photographers"].map((tag) => (
                        <span key={tag} className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 hover:bg-white/30 cursor-pointer transition-all font-sans">
               {tag}
             </span>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;