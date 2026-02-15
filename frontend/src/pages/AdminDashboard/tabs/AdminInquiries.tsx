import { useEffect, useState } from 'react';
import { AxiosClient } from '../../../config/axiosClient';
import { FaTrash, FaEnvelope, FaReply, FaCalendarAlt, FaCheckDouble } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await AxiosClient.get("/admin/inquiries", { headers: { Authorization: `Bearer ${token}` } });
            setInquiries(res.data.inquiries);
        } catch (error) {
            console.error("Failed to load inquiries", error);
            toast.error("Could not load messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchInquiries(); }, []);

    const handleDelete = async (id: string) => {
        if(!confirm("Are you sure you want to delete this message?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await AxiosClient.delete(`/admin/inquiries/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Message deleted");
            // Optimistic update
            setInquiries(prev => prev.filter(i => i._id !== id));
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaEnvelope className="text-primary" /> User Inquiries
                </h2>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-gray-100 text-gray-500">
                    {inquiries.length} Messages
                </span>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><CgSpinner className="animate-spin text-4xl text-primary"/></div>
            ) : inquiries.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <FaCheckDouble className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">All caught up! No new messages.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative">

                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg shrink-0">
                                        {inquiry.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">{inquiry.subject}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <span className="font-medium text-gray-700">{inquiry.name}</span>
                                            <span>&bull;</span>
                                            <span className="text-gray-400">{inquiry.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap">
                                    <FaCalendarAlt />
                                    {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-gray-600 text-sm leading-relaxed border border-gray-100 mb-4">
                                {inquiry.message}
                            </div>

                            <div className="flex gap-3 justify-end">
                                <a
                                    href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for contacting SubhVivah.%0D%0A%0D%0A(Write your reply here)`}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
                                >
                                    <FaReply /> Reply via Email
                                </a>
                                <button
                                    onClick={() => handleDelete(inquiry._id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminInquiries;