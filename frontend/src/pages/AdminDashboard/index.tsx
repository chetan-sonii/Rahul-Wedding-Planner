import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../store/slice/Admin.slice';
import AdminSidebar from './components/AdminSidebar';
import AdminOverview from './tabs/AdminOverview';
import AdminUsers from './tabs/AdminUsers';
import AdminVendors from './tabs/AdminVendors';
import AdminInquiries from './tabs/AdminInquiries';
// You can create AdminInquiries.tsx similarly or leave as placeholder

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAdminAuth } = useSelector((state: any) => state.admin);

    useEffect(() => {
        if (!isAdminAuth) {
            navigate('/admin/login');
        }
    }, [isAdminAuth, navigate]);

    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <AdminSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLogout={handleLogout}
            />

            <main className="ml-64 p-8">
                {activeTab === 'overview' && <AdminOverview />}
                {activeTab === 'users' && <AdminUsers />}
                {activeTab === 'vendors' && <AdminVendors />}
                {activeTab === 'inquiries' && <AdminInquiries />}
            </main>
        </div>
    );
};

export default AdminDashboard;