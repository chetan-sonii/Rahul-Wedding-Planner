import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from "framer-motion";
import { AxiosClient } from '../../../config/axiosClient';

// Debounce helper to prevent too many API calls
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};
interface VendorSuggestion {
    _id: string;
    name: string;
    category: string;
    city: string;
    image: string;
}
const Hero = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState<VendorSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Wait 500ms after typing stops before calling API
    const debouncedSearch = useDebounce(searchText, 500);

    // Fetch Suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearch.length > 2) {
                try {
                    const response = await AxiosClient.get(`/vendors?search=${debouncedSearch}`);
                    setSuggestions(response.data.vendors?.slice(0, 5) || []);
                    setShowSuggestions(true);
                } catch (error) {
                    // Avoid 'any' by logging the error directly or using a generic Error type
                    console.error("Error fetching suggestions", error);
                }
            }
        };
        fetchSuggestions();
    }, [debouncedSearch]);

    const handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/vendors?search=${searchText}`);
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: 'url("https://image.wedmegood.com/resized/1900X/uploads/city_bg_image/1/delhi_bg.jpeg")' }}
            >
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading drop-shadow-md tracking-tight">
                        Plan your Dream Wedding
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 font-sans font-light">
                        Find the best vendors, venues, and services
                    </p>
                </motion.div>

                {/* Search Bar Container */}
                <motion.div
                    className="mt-8 relative flex flex-col items-center justify-center w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex w-full md:w-2/3 bg-white rounded-full shadow-2xl p-1 border border-gray-200 relative z-50">

                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay so click registers
                            className="flex-grow px-6 py-4 text-gray-700 outline-none placeholder:text-gray-400 font-sans rounded-l-full"
                            placeholder="Search for 'Venue', 'Goa'..."
                        />

                        <button
                            onClick={handleSearch}
                            className="bg-primary hover:bg-pink-700 text-white rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2"
                        >
                            <CiSearch className="text-xl" />
                            <span className="hidden md:inline font-sans">Search</span>
                        </button>
                    </div>

                    {/* Real-time Suggestions Dropdown */}
                    <AnimatePresence>
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full mt-2 w-full md:w-2/3 bg-white rounded-xl shadow-xl overflow-hidden z-40 text-left"
                            >
                                {suggestions.map((vendor) => (
                                    <div
                                        key={vendor._id}
                                        onClick={() => navigate(`/vendors/${vendor._id}`)} // Or populate search
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                                    >
                                        <img src={vendor.image} alt="" className="w-10 h-10 rounded-md object-cover" />
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">{vendor.name}</h4>
                                            <p className="text-xs text-gray-500">{vendor.category} • {vendor.city}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;