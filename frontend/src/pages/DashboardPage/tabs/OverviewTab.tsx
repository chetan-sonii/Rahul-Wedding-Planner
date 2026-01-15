import React from 'react';
import { FaWallet, FaCheckDouble, FaUsers, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- 1. Define Interfaces for Type Safety ---
interface ChecklistItem {
    _id: string;
    text: string;
    isCompleted: boolean;
    dueDate?: string;
    note?: string;
}

interface FavoriteVendor {
    _id: string;
    price: number;
    // We only strictly need 'price' for calculations here,
    // but good to have other fields if needed later.
}

interface UserData {
    budget: number;
    guestCount: number;
    checklist: ChecklistItem[];
    favorites: FavoriteVendor[];
}

interface Props {
    user: UserData; // Replaced 'any' with specific UserData
    onTabChange: (tab: string) => void;
}

interface StatCardProps {
    icon: React.ReactNode;
    bg: string;
    label: string;
    value: string | number;
    sub: string;
}

const OverviewTab = ({ user, onTabChange }: Props) => {
    // 2. Calculate Stats
    // Safe navigation (?.) combined with defaults ensure no crashes
    const totalTasks = user.checklist?.length || 0;
    const completedTasks = user.checklist?.filter((t) => t.isCompleted).length || 0;
    const taskProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const shortlistedCount = user.favorites?.length || 0;

    // 3. Calculate "Estimated Cost" (Sum of shortlisted vendors)
    // Typescript now knows 'vendor' has a 'price' because of the interface
    const estimatedCost = user.favorites?.reduce((sum, vendor) => sum + (vendor.price || 0), 0) || 0;

    const budget = user.budget || 1; // Avoid divide by zero
    const budgetHealth = Math.min(Math.round((estimatedCost / budget) * 100), 100);

    return (
        <div className="space-y-8">
            {/* TOP STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<FaWallet className="text-white" />}
                    bg="bg-blue-500"
                    label="Total Budget"
                    value={`₹${(user.budget || 0).toLocaleString()}`}
                    sub={`Est. Cost: ₹${estimatedCost.toLocaleString()}`}
                />
                <StatCard
                    icon={<FaCheckDouble className="text-white" />}
                    bg="bg-green-500"
                    label="Task Progress"
                    value={`${taskProgress}%`}
                    sub={`${completedTasks}/${totalTasks} Completed`}
                />
                <StatCard
                    icon={<FaHeart className="text-white" />}
                    bg="bg-pink-500"
                    label="Shortlisted"
                    value={shortlistedCount}
                    sub="Vendors Saved"
                />
                <StatCard
                    icon={<FaUsers className="text-white" />}
                    bg="bg-purple-500"
                    label="Guest List"
                    value={user.guestCount || 0}
                    sub="Expected Guests"
                />
            </div>

            {/* DETAILED WIDGETS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. BUDGET HEALTH CHART */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Budget Health</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2 font-medium text-gray-600">
                                <span>Shortlisted Vendor Cost</span>
                                <span>{budgetHealth}% of Budget</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${budgetHealth}%` }}
                                    className={`h-full rounded-full ${budgetHealth > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                                />
                            </div>
                            {budgetHealth > 100 && (
                                <p className="text-xs text-red-500 mt-2 font-bold">⚠️ You are potentially over budget!</p>
                            )}
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="text-xs text-blue-500 font-bold uppercase">Remaining Budget</p>
                                <p className="text-xl font-bold text-blue-700">₹{(user.budget - estimatedCost).toLocaleString()}</p>
                            </div>
                            <button onClick={() => onTabChange('settings')} className="text-sm text-blue-600 font-bold hover:underline">Update Budget</button>
                        </div>
                    </div>
                </div>

                {/* 2. PRIORITY TASKS */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Next Up</h3>
                        <button onClick={() => onTabChange('checklist')} className="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {/* Filter pending tasks */}
                        {user.checklist?.filter((t) => !t.isCompleted).slice(0, 3).map((task) => (
                            <div key={task._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">{task.text}</p>
                                    {task.dueDate && <p className="text-xs text-gray-400 mt-0.5">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                                </div>
                            </div>
                        ))}
                        {(!user.checklist || user.checklist.filter((t) => !t.isCompleted).length === 0) && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <FaCheckDouble className="text-4xl mb-2 opacity-20" />
                                <p>All caught up!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// UI Component with explicit types
const StatCard = ({ icon, bg, label, value, sub }: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200 ${bg}`}>
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
        </div>
    </div>
);

export default OverviewTab;