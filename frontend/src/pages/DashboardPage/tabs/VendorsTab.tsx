import { useState } from 'react';
import { FaTrash, FaStar, FaMapMarkerAlt, FaTimes, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

interface Vendor {
    _id: string;
    name: string;
    category: string;
    city: string;
    price: number;
    rating: number;
    image: string;
    description?: string;
}

interface Props {
    vendors: Vendor[];
    onRemove: (id: string) => void;
}

const VendorsTab = ({ vendors, onRemove }: Props) => {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vendors.map(vendor => (
                    <div
                        key={vendor._id}
                        onClick={() => setSelectedVendor(vendor)}
                        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-md transition-all"
                    >
                        <div className="h-48 relative">
                            <img src={vendor.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${vendor.name}`; }}/>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove(vendor._id); }}
                                className="absolute top-4 right-4 bg-white/90 p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all z-10"
                            >
                                <FaTrash size={12} />
                            </button>
                        </div>
                        <div className="p-6">
                            <h4 className="font-bold text-gray-800">{vendor.name}</h4>
                            <p className="text-xs text-gray-400 font-medium uppercase mt-1">{vendor.category} • {vendor.city}</p>
                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                <span className="text-primary font-bold flex items-center"><BiRupee />{vendor.price.toLocaleString()}</span>
                                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded-lg">★ {vendor.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {vendors.length === 0 && <p className="col-span-full text-center text-gray-400 py-10">No vendors shortlisted.</p>}
            </div>

            {/* VENDOR DETAILS MODAL */}
            <AnimatePresence>
                {selectedVendor && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVendor(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden z-10">
                            <button onClick={() => setSelectedVendor(null)} className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800"><FaTimes /></button>

                            <div className="h-48 bg-gray-200">
                                <img src={selectedVendor.image} className="w-full h-full object-cover" alt="" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${selectedVendor.name}`; }}/>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{selectedVendor.name}</h2>
                                        <p className="text-gray-500 flex items-center gap-2 text-sm mt-1">
                                            <FaMapMarkerAlt /> {selectedVendor.city} • {selectedVendor.category}
                                        </p>
                                    </div>
                                    <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                                        <FaStar /> {selectedVendor.rating}
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {selectedVendor.description || "Premium wedding services tailored to your needs."}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 w-full border border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
                                        <FaPhoneAlt /> Call
                                    </button>
                                    <button className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-pink-700">
                                        <FaEnvelope /> Email
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VendorsTab;