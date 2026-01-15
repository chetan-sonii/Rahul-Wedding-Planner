import React, { useState } from 'react';
import { FaUser, FaHeart, FaLock, FaSave } from 'react-icons/fa';

interface Props {
    user: any;
    onUpdateProfile: (formData: any) => void;
}

const SettingsTab = ({ user, onUpdateProfile }: Props) => {
    // Initialize state with user data
    const [formData, setFormData] = useState({
        name: user.name || "",
        partnerName: user.partnerName || "",
        weddingDate: user.weddingDate ? user.weddingDate.split('T')[0] : "",
        budget: user.budget || 0,
        guestCount: user.guestCount || 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateProfile(formData);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: SETTINGS FORM */}
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            <FaHeart className="text-primary" /> Wedding Details
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Manage your big day specifics</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Your Name" name="name" value={formData.name} onChange={handleChange} />
                            <InputField label="Partner's Name" name="partnerName" value={formData.partnerName} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="Wedding Date" name="weddingDate" type="date" value={formData.weddingDate} onChange={handleChange} />
                            <InputField label="Total Budget (₹)" name="budget" type="number" value={formData.budget} onChange={handleChange} />
                            <InputField label="Guest Count" name="guestCount" type="number" value={formData.guestCount} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 flex justify-end">
                        <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg shadow-pink-100">
                            <FaSave /> Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* RIGHT: ACCOUNT & DANGER ZONE */}
            <div className="space-y-6">

                {/* Account Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaUser className="text-gray-400" /> Account
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                            <p className="font-medium text-gray-700">{user.email}</p>
                        </div>
                        <button type="button" className="w-full border border-gray-200 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                            <FaLock size={12} /> Change Password
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                    <h3 className="font-bold text-red-700 mb-2">Danger Zone</h3>
                    <p className="text-xs text-red-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button type="button" className="w-full bg-white border border-red-200 text-red-600 py-2 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-colors">
                        Delete Account
                    </button>
                </div>

            </div>
        </div>
    );
};

const InputField = ({ label, name, type = "text", value, onChange }: any) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-pink-50 transition-all font-medium"
        />
    </div>
);

export default SettingsTab;