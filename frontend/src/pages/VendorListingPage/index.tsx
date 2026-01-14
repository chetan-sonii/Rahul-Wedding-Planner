import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { AxiosClient } from '../../config/axiosClient';
import { FaStar, FaMapMarkerAlt, FaFilter, FaSearch, FaTimes, FaPhoneAlt, FaEnvelope, FaHeart } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

// Types
interface Vendor {
    _id: string;
    name: string;
    category: string;
    city: string;
    price: number;
    rating: number;
    image: string;
    description?: string;
    contact_info?: {
        phone: string;
        email: string;
    };
}

const CATEGORIES = [
    "Venue", "Photographer", "Makeup", "Bridal Wear", "Groom Wear", "Mehndi", "Catering", "Decoration"
];

const VendorListingPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // NEW: Store the IDs of vendors the user has liked
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

    const city = searchParams.get('city') || '';
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    // Helper: Auth Headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
    };

    // 1. Fetch User Favorites (So we know which hearts to paint Red)
    useEffect(() => {
        const fetchUserFavorites = async () => {
            const headers = getAuthHeaders();
            if (!headers) return; // Not logged in

            try {
                // Reuse dashboard endpoint to get favorites
                const res = await AxiosClient.get('/user/dashboard', headers);
                // Extract just the IDs
                const ids = res.data.user.favorites.map((fav: any) => fav._id);
                setFavoriteIds(ids);
            } catch (error) {
                console.error("Could not fetch favorites", error);
            }
        };
        fetchUserFavorites();
    }, []);

    // 2. Fetch Cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await AxiosClient.get('/vendors/cities');
                setCities(res.data.cities);
            } catch (err) {
                console.error("Failed to load cities", err);
            }
        };
        fetchCities();
    }, []);

    // 3. Fetch Vendors
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                setLoading(true);
                const query = new URLSearchParams({
                    ...(city && { city }),
                    ...(category && { category }),
                    ...(search && { search })
                }).toString();

                const response = await AxiosClient.get(`/vendors?${query}`);
                setVendors(response.data.vendors);
            } catch (error) {
                console.error("Error fetching vendors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, [city, category, search]);

    // 4. Handle Shortlist (Toggle Logic)
    const handleShortlist = async (vendorId: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation(); // Prevent opening modal if clicked on card heart

        const headers = getAuthHeaders();
        if (!headers) {
            toast.error("Please login to shortlist vendors");
            navigate("/login");
            return;
        }

        // Optimistic UI Update (Change color immediately)
        const isCurrentlyLiked = favoriteIds.includes(vendorId);

        if (isCurrentlyLiked) {
            setFavoriteIds(prev => prev.filter(id => id !== vendorId));
            toast.info("Removed from shortlist");
        } else {
            setFavoriteIds(prev => [...prev, vendorId]);
            toast.success("Added to shortlist");
        }

        try {
            await AxiosClient.post("/user/favorites", { vendorId }, headers);
            // Background sync not strictly needed if optimistic update works,
            // but ensures consistency on refresh.
        } catch (error) {
            console.error("Shortlist error:", error);
            toast.error("Failed to update shortlist");
            // Revert changes if API fails
            if (isCurrentlyLiked) setFavoriteIds(prev => [...prev, vendorId]);
            else setFavoriteIds(prev => prev.filter(id => id !== vendorId));
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set(key, value);
        else newParams.delete(key);
        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 font-sans">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">

                {/* SIDEBAR */}
                <aside className="w-full lg:w-1/4 space-y-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search vendors..."
                                value={search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                            <FaFilter className="text-primary" />
                            <h2 className="text-lg font-bold font-heading text-gray-800">Filters</h2>
                        </div>
                        <div className="mb-8">
                            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">City</h3>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors cursor-pointer"
                                value={city}
                                onChange={(e) => handleFilterChange('city', e.target.value)}
                            >
                                <option value="">All Cities</option>
                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">Category</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-2 hover:bg-pink-50 rounded-lg cursor-pointer transition-colors">
                                    <input type="radio" name="category" checked={category === ''} onChange={() => handleFilterChange('category', '')} className="accent-primary w-4 h-4" />
                                    <span className="text-sm text-gray-600">All Categories</span>
                                </label>
                                {CATEGORIES.map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 p-2 hover:bg-pink-50 rounded-lg cursor-pointer transition-colors">
                                        <input type="radio" name="category" checked={category === cat} onChange={() => handleFilterChange('category', cat)} className="accent-primary w-4 h-4" />
                                        <span className="text-sm text-gray-600">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN GRID */}
                <main className="w-full lg:w-3/4">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold font-heading text-gray-800">
                            {category || 'All'} Vendors {city && `in ${city}`}
                        </h1>
                        <span className="text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full border shadow-sm">
                            {vendors.length} results
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-32"><CgSpinner className="animate-spin text-5xl text-primary" /></div>
                    ) : vendors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {vendors.map((vendor) => (
                                <div
                                    key={vendor._id}
                                    onClick={() => setSelectedVendor(vendor)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 relative"
                                >
                                    {/* HEART ICON ON CARD */}
                                    <button
                                        onClick={(e) => handleShortlist(vendor._id, e)}
                                        className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                                    >
                                        <FaHeart className={favoriteIds.includes(vendor._id) ? "text-red-500" : "text-gray-300"} />
                                    </button>

                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={vendor.image}
                                            alt={vendor.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${vendor.name}`; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-white text-sm font-medium">Click to view details</span>
                                        </div>
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-gray-800 shadow-sm">
                                            <FaStar className="text-yellow-400" /> {vendor.rating}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{vendor.name}</h3>
                                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                            <FaMapMarkerAlt /> {vendor.city} • {vendor.category}
                                        </div>
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                                            <div className="text-primary font-bold text-lg flex items-center">
                                                <BiRupee /> {vendor.price.toLocaleString()}
                                            </div>
                                            <button className="text-xs font-semibold bg-pink-50 text-primary px-3 py-1.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">No vendors found.</p>
                            <button onClick={() => {handleFilterChange('city', ''); handleFilterChange('category', ''); handleFilterChange('search', '');}} className="mt-4 text-primary font-medium hover:underline">Clear filters</button>
                        </div>
                    )}
                </main>
            </div>

            {/* VENDOR DETAILS MODAL */}
            <AnimatePresence>
                {selectedVendor && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedVendor(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden z-10 max-h-[90vh] flex flex-col"
                        >
                            <button onClick={() => setSelectedVendor(null)} className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white hover:text-red-500 transition-colors shadow-sm">
                                <FaTimes />
                            </button>

                            {/* HEART BUTTON INSIDE MODAL */}
                            <button
                                onClick={() => handleShortlist(selectedVendor._id)}
                                className="absolute top-4 right-16 z-10 bg-white/80 p-2.5 rounded-full hover:bg-white transition-all shadow-sm"
                                title="Shortlist Vendor"
                            >
                                <FaHeart size={18} className={favoriteIds.includes(selectedVendor._id) ? "text-red-500" : "text-gray-300"} />
                            </button>

                            <div className="h-64 relative shrink-0">
                                <img
                                    src={selectedVendor.image} alt={selectedVendor.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${selectedVendor.name}`; }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                                    <h2 className="text-3xl font-bold text-white font-heading">{selectedVendor.name}</h2>
                                    <p className="text-gray-200 flex items-center gap-2 mt-1">
                                        <FaMapMarkerAlt /> {selectedVendor.city} • <FaStar className="text-yellow-400" /> {selectedVendor.rating} Rating
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 overflow-y-auto">
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <span className="bg-pink-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-pink-100">{selectedVendor.category}</span>
                                    <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-100 flex items-center">
                                        <BiRupee /> {selectedVendor.price.toLocaleString()} Onwards
                                    </span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <h3 className="font-bold text-gray-800 text-lg">About</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {selectedVendor.description || "This vendor provides premium wedding services. Contact them to know more about their packages and availability for your big day."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-pink-50 transition-colors">
                                        <FaPhoneAlt /> Call Vendor
                                    </button>
                                    <button className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200">
                                        <FaEnvelope /> Send Inquiry
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VendorListingPage;