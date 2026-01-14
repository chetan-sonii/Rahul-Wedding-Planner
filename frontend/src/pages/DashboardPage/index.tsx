import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { AxiosClient } from '../../config/axiosClient';
import { FaHome, FaTasks, FaHeart, FaUserCog, FaSignOutAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// Import the sub-components
import ChecklistTab from './tabs/ChecklistTab';
import VendorsTab from './tabs/VendorsTab';
import OverviewTab from './tabs/OverviewTab';
import SettingsTab from './tabs/SettingsTab';

// --- Types ---
type ChecklistAction = 'add' | 'toggle' | 'delete' | 'edit';

interface ChecklistExtras {
    dueDate?: string;
    note?: string;
}

interface ChecklistItem {
    _id: string;
    text: string;
    isCompleted: boolean;
    dueDate?: string;
    note?: string;
}

interface ProfileUpdateData {
    name: string;
    partnerName: string;
    weddingDate: string;
    budget: number;
    guestCount: number;
}

interface FavoriteVendor {
    _id: string;
    name: string;
    category: string;
    city: string;
    price: number;
    rating: number;
    image: string;
}

interface UserData {
    name: string;
    email: string;
    partnerName: string;
    weddingDate: string;
    budget: number;
    guestCount: number;
    favorites: FavoriteVendor[];
    checklist: ChecklistItem[];
}

const DashboardPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // TAB LOGIC: Read from URL, default to 'overview'
    const activeTab = searchParams.get('tab') || 'overview';

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Helper to switch tabs
    const handleTabChange = (tab: string) => {
        setSearchParams({ tab });
    };

    const getAuthHeaders = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    // 1. Fetch Dashboard Data
    const fetchDashboard = async () => {
        try {
            const res = await AxiosClient.get("/user/dashboard", getAuthHeaders());
            setUser(res.data.user);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDashboard(); }, []);

    // 2. Checklist Handler
    const handleChecklistUpdate = async (
        action: ChecklistAction,
        text?: string,
        itemId?: string,
        extra?: ChecklistExtras
    ) => {
        try {
            const payload = { action, text, itemId, ...extra };
            const res = await AxiosClient.post("/user/checklist", payload, getAuthHeaders());
            if (user) setUser({ ...user, checklist: res.data.checklist });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update checklist");
        }
    };

    // 3. Remove Favorite Handler
    const handleRemoveFavorite = async (id: string) => {
        try {
            await AxiosClient.post("/user/favorites", { vendorId: id }, getAuthHeaders());
            toast.success("Removed from shortlist");
            fetchDashboard(); // Refresh to update list and stats
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
            toast.error("Failed to remove vendor");
        }
    };

    // 4. Profile Update Handler
    const handleProfileUpdate = async (formData: ProfileUpdateData) => {
        try {
            await AxiosClient.patch("/user/profile", formData, getAuthHeaders());
            toast.success("Profile updated successfully!");
            fetchDashboard(); // Refresh to show new name/date/budget
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    // Countdown Helper
    const getCountdown = () => {
        if (!user?.weddingDate) return 0;
        const diff = new Date(user.weddingDate).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><FaSpinner className="animate-spin text-3xl text-primary" /></div>;
    if (!user) return null;

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* SIDEBAR */}
            <aside className="w-72 bg-white border-r border-gray-200 hidden lg:flex flex-col">
                <div className="p-8 pb-12">
                    <h2 className="text-2xl font-bold font-heading text-primary">SubhVivah</h2>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <SidebarItem icon={<FaHome />} label="Overview" active={activeTab === 'overview'} onClick={() => handleTabChange('overview')} />
                    <SidebarItem icon={<FaTasks />} label="Checklist" active={activeTab === 'checklist'} onClick={() => handleTabChange('checklist')} />
                    <SidebarItem icon={<FaHeart />} label="Shortlist" active={activeTab === 'vendors'} onClick={() => handleTabChange('vendors')} />
                    <SidebarItem icon={<FaUserCog />} label="Settings" active={activeTab === 'settings'} onClick={() => handleTabChange('settings')} />
                </nav>
                <div className="p-6 border-t border-gray-100">
                    <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="flex items-center gap-3 text-gray-500 hover:text-red-500 px-4 py-3 w-full transition-colors font-semibold text-sm">
                        <FaSignOutAlt /> Log Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <span className="text-primary font-bold text-xs uppercase tracking-widest">Dashboard</span>
                            <h1 className="text-4xl font-bold text-gray-900 font-heading mt-1">Hello, {user.name.split(' ')[0]}</h1>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="p-3 bg-pink-50 rounded-xl text-primary"><FaCalendarAlt /></div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 leading-none">{getCountdown() > 0 ? `${getCountdown()} Days` : "Big Day!"}</p>
                                <p className="text-xs text-gray-400 font-medium mt-1 uppercase">To the Wedding</p>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* OVERVIEW TAB */}
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <OverviewTab user={user} onTabChange={handleTabChange} />
                            </motion.div>
                        )}

                        {/* CHECKLIST TAB */}
                        {activeTab === 'checklist' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <ChecklistTab checklist={user.checklist} onUpdate={handleChecklistUpdate} />
                            </motion.div>
                        )}

                        {/* VENDORS TAB */}
                        {activeTab === 'vendors' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <VendorsTab vendors={user.favorites} onRemove={handleRemoveFavorite} />
                            </motion.div>
                        )}

                        {/* SETTINGS TAB */}
                        {activeTab === 'settings' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SettingsTab user={user} onUpdateProfile={handleProfileUpdate} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

// UI Component (Fixed Type)
const SidebarItem = ({
                         icon,
                         label,
                         active,
                         onClick
                     }: {
    icon: React.ReactNode, // Fixed: ReactNode instead of any
    label: string,
    active: boolean,
    onClick: () => void
}) => (
    <button onClick={onClick} className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all ${active ? 'bg-pink-50 text-primary shadow-sm shadow-pink-50' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
        <span className="text-lg">{icon}</span> {label}
    </button>
);

export default DashboardPage;