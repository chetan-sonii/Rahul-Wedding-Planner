import React, { useEffect, useState } from 'react';
import { AxiosClient } from '../../../config/axiosClient';
import { FaUsers, FaStore, FaEnvelope, FaServer, FaStar } from 'react-icons/fa';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    bg: string;
}

const AdminOverview = () => {
    const [stats, setStats] = useState({ users: 0, vendors: 0, inquiries: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) return;
            try {
                const res = await AxiosClient.get("/admin/stats", { headers: { Authorization: `Bearer ${token}` } });
                setStats(res.data.stats);
            } catch (error) {
                console.error("Failed to load stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<FaUsers />} label="Total Users" value={stats.users} bg="bg-blue-500"
                />
                <StatCard
                    icon={<FaStore />} label="Total Vendors" value={stats.vendors} bg="bg-purple-500"
                />
                <StatCard
                    icon={<FaEnvelope />} label="Pending Inquiries" value={stats.inquiries} bg="bg-pink-500"
                />
                {/* New Statistics */}
                <StatCard
                    icon={<FaServer />} label="System Status" value="Online" bg="bg-green-500"
                />
                <StatCard
                    icon={<FaStar />} label="Avg Vendor Rating" value="4.8" bg="bg-yellow-500"
                />
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, bg }: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ${bg}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default AdminOverview;