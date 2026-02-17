import { useEffect, useState } from 'react';
import { AxiosClient } from '../config/axiosClient';
import { FaTrash, FaUserCircle, FaSearch, FaEye, FaTimes, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';

// --- Types ---
interface ShortlistedVendor {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    city: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    partnerName?: string;
    weddingDate?: string;
    budget?: number;
    guestCount?: number;
    favorites?: ShortlistedVendor[]; // Expecting full objects, not just IDs
}

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await AxiosClient.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });
            setUsers(res.data.users);
            setFilteredUsers(res.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(u =>
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, users]);

    const handleDelete = async (id: string) => {
        if(!confirm("Are you sure you want to ban this user? This action cannot be undone.")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await AxiosClient.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("User deleted successfully");
            fetchUsers(); // Refresh list
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    // Helper: Calculate Total Cost of Shortlisted Vendors
    // We use 'any' check here to prevent crashes if backend sends IDs instead of objects
    const calculateShortlistCost = (favorites: any[] = []) => {
        if (!favorites || !Array.isArray(favorites)) return 0;
        return favorites.reduce((acc, curr) => {
            // Only add price if curr is a valid object with a price
            return acc + (curr?.price || 0);
        }, 0);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3 text-gray-400"/>
                    <input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-primary w-64"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                    <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Wedding Date</th>
                        <th className="p-4">Shortlist Stats</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map(user => {
                        const shortlistCost = calculateShortlistCost(user.favorites);
                        const vendorCount = user.favorites?.length || 0;

                        return (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
                                            <FaUserCircle />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    {user.weddingDate ? new Date(user.weddingDate).toLocaleDateString() : <span className="text-gray-400">Not set</span>}
                                </td>
                                <td className="p-4">
                                    <div className="text-sm">
                                        <p className="font-bold text-gray-700">{vendorCount} Vendors</p>
                                        <p className="text-xs text-gray-500">Est. Cost: ₹{shortlistCost.toLocaleString()}</p>
                                    </div>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        title="Ban User"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* --- USER DETAILS MODAL --- */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl">
                                        <FaUserCircle />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                                        <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto">

                                {/* 1. Personal & Wedding Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-blue-400 uppercase mb-1">Partner</p>
                                        <p className="font-bold text-gray-800 text-lg">{selectedUser.partnerName || "N/A"}</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-purple-400 uppercase mb-1">Wedding Date</p>
                                        <p className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                            <FaCalendarAlt className="text-sm" />
                                            {selectedUser.weddingDate ? new Date(selectedUser.weddingDate).toLocaleDateString() : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-green-600 uppercase mb-1">User Budget</p>
                                        <p className="font-bold text-gray-800 text-lg">₹{(selectedUser.budget || 0).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* 2. Shortlisted Vendors Section */}
                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FaHeart className="text-primary" /> Shortlisted Vendors ({selectedUser.favorites?.length || 0})
                                </h4>

                                {selectedUser.favorites && selectedUser.favorites.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedUser.favorites.map((fav: any) => {
                                            // Guard clause: If backend sends just IDs (strings), don't render this item
                                            if (typeof fav !== 'object' || !fav) return null;

                                            return (
                                                <div key={fav._id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                                    <img
                                                        src={fav.image}
                                                        alt={fav.name}
                                                        className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100?text=${fav.name?.charAt(0) || 'V'}`; }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-bold text-gray-800">{fav.name}</p>
                                                        <p className="text-xs text-gray-500">{fav.city} • {fav.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-primary">₹{fav.price?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Total Summary */}
                                        <div className="bg-gray-900 text-white p-4 rounded-xl flex justify-between items-center mt-4">
                                            <span>Total Shortlist Value</span>
                                            <span className="text-xl font-bold">₹{calculateShortlistCost(selectedUser.favorites).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                        <p className="text-gray-400">No vendors shortlisted yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;