import { useSelector } from 'react-redux';
import { FaHeart, FaListUl, FaRegUser } from 'react-icons/fa'; // Removed FaSignOutAlt
import { MdDashboard } from 'react-icons/md';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCredentials } from '../../types/auth';

// 1. Define the Redux State Structure to fix 'state: any' error
interface RootState {
    UserSlice: {
        user: UserCredentials | undefined;
    };
}

const DashboardPage = () => {
    // 2. Apply the type to useSelector
    const { user } = useSelector((state: RootState) => state.UserSlice);
    const [activeTab, setActiveTab] = useState('overview');

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <MdDashboard /> },
        { id: 'shortlist', label: 'Shortlisted Vendors', icon: <FaHeart /> },
        { id: 'profile', label: 'My Profile', icon: <FaRegUser /> },
        { id: 'checklist', label: 'Wedding Checklist', icon: <FaListUl /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">

            {/* Sidebar (Desktop) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-8 border-b border-gray-100">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-2xl text-primary font-bold mx-auto mb-4">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <h2 className="text-center font-heading font-bold text-gray-800 truncate px-2">
                        {user?.name || "User"}
                    </h2>
                    <p className="text-center text-xs text-gray-500 mt-1 truncate px-2">
                        {user?.email}
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                                activeTab === item.id
                                    ? 'bg-pink-50 text-primary'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-heading text-gray-800">
                            {activeTab === 'overview' && "Dashboard Overview"}
                            {activeTab === 'shortlist' && "My Shortlist"}
                            {activeTab === 'profile' && "Profile Settings"}
                            {activeTab === 'checklist' && "My Checklist"}
                        </h1>
                        <p className="text-gray-500">Welcome to your wedding planning hub.</p>
                    </div>

                    {/* Content Switcher */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'overview' && <OverviewTab user={user} />}
                        {activeTab === 'shortlist' && <ShortlistTab />}
                        {activeTab === 'profile' && <ProfileTab user={user} />}
                        {activeTab === 'checklist' && <ChecklistTab />}
                    </motion.div>

                </div>
            </main>
        </div>
    );
};

// --- Sub Components ---

// 3. Typed the props correctly: { user: UserCredentials | undefined }
const OverviewTab = ({ user }: { user: UserCredentials | undefined }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Welcome Banner - Now actually uses 'user' to prevent "unused variable" error */}
        <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-primary to-pink-400 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10">
                <h2 className="text-2xl font-bold font-heading">
                    Welcome back, {user?.name?.split(' ')[0] || "Planner"}!
                </h2>
                <p className="mt-2 opacity-90 max-w-lg">
                    You have 0 pending tasks. Start browsing vendors to create your dream team.
                </p>
                <button className="mt-6 bg-white text-primary px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors shadow-sm">
                    Browse Vendors
                </button>
            </div>
            <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-2xl" />
        </div>

        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Shortlisted</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            <p className="text-xs text-pink-500 mt-1">Vendors saved</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Inquiries</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            <p className="text-xs text-blue-500 mt-1">Messages sent</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Days to go</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">TBD</p>
            <p className="text-xs text-green-500 mt-1">Set your date!</p>
        </div>
    </div>
);

const ShortlistTab = () => (
    <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-100">
        <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-3xl text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Your shortlist is empty</h3>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Go explore venues, photographers, and makeup artists to save them here!
        </p>
    </div>
);

// 4. Typed props correctly here too
const ProfileTab = ({ user }: { user: UserCredentials | undefined }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <div className="grid grid-cols-1 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-500 cursor-not-allowed"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    type="text"
                    value={user?.email || ''}
                    disabled
                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-500 cursor-not-allowed"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="text"
                    placeholder="Add phone number"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary focus:border-primary outline-none transition-shadow focus:ring-1"
                />
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition w-max font-medium">
                Save Changes
            </button>
        </div>
    </div>
);

const ChecklistTab = () => (
    <div className="space-y-4">
        {["Book Venue", "Finalize Guest List", "Book Photographer", "Buy Wedding Ring", "Send Invitations"].map((item, i) => (
            <div key={i} className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group">
                <input
                    type="checkbox"
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer accent-pink-600"
                />
                <span className="ml-3 text-gray-700 font-medium group-hover:text-primary transition-colors">{item}</span>
            </div>
        ))}
    </div>
);

export default DashboardPage;