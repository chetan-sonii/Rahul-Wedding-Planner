import React, { useEffect, useState } from 'react';
import { AxiosClient } from '../../../config/axiosClient';
import { FaTrash, FaPlus, FaTimes, FaSearch, FaFilter, FaEdit, FaImage, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';

interface Vendor {
    _id: string;
    name: string;
    category: string;
    city: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    contact_info?: {
        email: string;
        phone: string;
    };
}

const CATEGORIES = ["Venue", "Photographer", "Makeup", "Bridal Wear", "Groom Wear", "Mehndi", "Catering", "Decoration"];

const AdminVendors = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    // Form State
    const initialForm = {
        name: '', category: 'Venue', city: '', price: 0, rating: 4.5, image: '', description: '',
        email: '', phone: ''
    };
    const [formData, setFormData] = useState(initialForm);

    // --- 1. Fetch Vendors ---
    const fetchVendors = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await AxiosClient.get("/admin/vendors", { headers: { Authorization: `Bearer ${token}` } });
            setVendors(res.data.vendors);
            setFilteredVendors(res.data.vendors);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch vendors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchVendors(); }, []);

    // --- 2. Filter Logic ---
    useEffect(() => {
        let result = vendors;
        if (searchTerm) {
            result = result.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (categoryFilter !== 'All') {
            result = result.filter(v => v.category === categoryFilter);
        }
        setFilteredVendors(result);
    }, [searchTerm, categoryFilter, vendors]);

    // --- 3. CRUD Handlers ---

    // Open Modal for Adding
    const handleOpenAdd = () => {
        setFormData(initialForm);
        setIsEditing(false);
        setShowModal(true);
    };

    // Open Modal for Editing
    const handleOpenEdit = (vendor: Vendor) => {
        setFormData({
            name: vendor.name,
            category: vendor.category,
            city: vendor.city,
            price: vendor.price,
            rating: vendor.rating,
            image: vendor.image,
            description: vendor.description || '',
            email: vendor.contact_info?.email || '',
            phone: vendor.contact_info?.phone || ''
        });
        setCurrentId(vendor._id);
        setIsEditing(true);
        setShowModal(true);
    };

    // Delete Vendor
    const handleDelete = async (id: string) => {
        if(!confirm("Are you sure you want to delete this vendor?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await AxiosClient.delete(`/admin/vendors/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Vendor deleted successfully");
            fetchVendors();
        } catch (error) {
            toast.error("Failed to delete vendor");
        }
    };

    // Submit Form (Add or Update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            const payload = {
                ...formData,
                contact_info: { email: formData.email, phone: formData.phone }
            };

            if (isEditing && currentId) {
                // UPDATE
                await AxiosClient.put(`/admin/vendors/${currentId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
                toast.success("Vendor updated successfully");
            } else {
                // CREATE
                await AxiosClient.post("/admin/vendors", payload, { headers: { Authorization: `Bearer ${token}` } });
                toast.success("Vendor created successfully");
            }

            setShowModal(false);
            fetchVendors();
        } catch (error) {
            toast.error(isEditing ? "Failed to update vendor" : "Failed to add vendor");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaFilter className="text-primary" /> Vendor Manager
                </h2>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative group">
                        <FaSearch className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"/>
                        <input
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-pink-100 outline-none transition-all w-full md:w-64"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-pink-100 outline-none cursor-pointer"
                    >
                        <option value="All">All Categories</option>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    {/* Add Button */}
                    <button onClick={handleOpenAdd} className="bg-primary hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-200">
                        <FaPlus /> Add New
                    </button>
                </div>
            </div>

            {/* Vendor Grid */}
            {loading ? (
                <div className="flex justify-center py-20"><CgSpinner className="animate-spin text-4xl text-primary"/></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVendors.map(v => (
                        <div key={v._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group relative">
                            {/* Image with Fallback */}
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                <img
                                    src={v.image}
                                    alt={v.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${v.name}`; }}
                                />
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenEdit(v)}
                                        className="bg-white p-2 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 shadow-sm transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(v._id)}
                                        className="bg-white p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 shadow-sm transition-colors"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                    {v.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-800 truncate">{v.name}</h3>
                                    <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">★ {v.rating}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">{v.city}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                    <span className="font-bold text-primary">₹{v.price.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400">Onwards</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- ADD / EDIT MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                {isEditing ? <FaEdit className="text-blue-500" /> : <FaPlus className="text-green-500" />}
                                {isEditing ? "Edit Vendor" : "Add New Vendor"}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 p-2 rounded-full">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Left Column: Details */}
                            <div className="space-y-5">
                                <h4 className="font-bold text-gray-500 uppercase text-xs tracking-wider border-b pb-2">Basic Details</h4>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vendor Name</label>
                                    <input
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                        placeholder="e.g. Royal Palace" required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                        <select
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                                        >
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                                        <input
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                                            placeholder="e.g. Mumbai" required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                                        <input
                                            type="number" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.price} onChange={e => setFormData({...formData, price: +e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Rating</label>
                                        <input
                                            type="number" step="0.1" max="5" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.rating} onChange={e => setFormData({...formData, rating: +e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none h-24 resize-none"
                                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                                        placeholder="Tell us about the vendor..."
                                    />
                                </div>
                            </div>

                            {/* Right Column: Contact & Image */}
                            <div className="space-y-5">
                                <h4 className="font-bold text-gray-500 uppercase text-xs tracking-wider border-b pb-2">Contact Info</h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                            placeholder="vendor@mail.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                            placeholder="+91 98765..."
                                        />
                                    </div>
                                </div>

                                <h4 className="font-bold text-gray-500 uppercase text-xs tracking-wider border-b pb-2 pt-4">Media</h4>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex justify-between">
                                        Image URL
                                        <span className="text-xs text-gray-400 font-normal">Paste direct link</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="bg-gray-100 p-2 rounded-lg text-gray-500"><FaImage /></div>
                                        <input
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                                            placeholder="https://..." required
                                        />
                                    </div>
                                </div>

                                {/* IMAGE PREVIEW */}
                                <div className="mt-2 w-full h-48 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                                    {formData.image ? (
                                        <>
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL"; }}
                                            />
                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Preview</div>
                                        </>
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <FaImage className="mx-auto text-3xl mb-2 opacity-30" />
                                            <p className="text-xs">Image preview will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="col-span-1 lg:col-span-2 flex justify-end gap-4 pt-6 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-primary text-white px-8 py-2 rounded-lg font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 flex items-center gap-2">
                                    <FaSave /> {isEditing ? "Update Vendor" : "Save Vendor"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVendors;