import { FaChartPie, FaUsers, FaStore, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

interface Props {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout: () => void;
}

const AdminSidebar = ({ activeTab, onTabChange, onLogout }: Props) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <FaChartPie /> },
        { id: 'users', label: 'Manage Users', icon: <FaUsers /> },
        { id: 'vendors', label: 'Manage Vendors', icon: <FaStore /> },
        { id: 'inquiries', label: 'Inquiries', icon: <FaEnvelope /> },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col p-6 fixed left-0 top-0">
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">A</div>
                <h2 className="text-xl font-bold font-heading">Admin Panel</h2>
            </div>

            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeTab === item.id
                                ? 'bg-primary text-white shadow-lg shadow-pink-900/20'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            <button
                onClick={onLogout}
                className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-bold transition-all mt-auto"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>
    );
};

export default AdminSidebar;