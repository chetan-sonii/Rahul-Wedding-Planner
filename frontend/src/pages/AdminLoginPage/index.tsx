import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AxiosClient } from '../../config/axiosClient';
import { setAdmin } from '../../store/slice/Admin.slice';
import { toast } from 'react-toastify';
import { FaLock, FaUserShield } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Call the specific Admin Login Endpoint
            const res = await AxiosClient.post("/admin/login", { email, password });

            if (res.data.success) {
                // Dispatch to Admin Slice
                dispatch(setAdmin({
                    admin: res.data.admin,
                    token: res.data.token
                }));

                toast.success("Welcome, Administrator");
                navigate("/admin/dashboard");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid Admin Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUserShield size={30} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                    <p className="text-gray-400 text-sm mt-1">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="admin@subhvivah.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <FaLock className="absolute right-4 top-3.5 text-gray-500" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-pink-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-pink-900/20 flex items-center justify-center gap-2"
                    >
                        {loading ? <CgSpinner className="animate-spin text-xl" /> : "Access Dashboard"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => navigate("/")} className="text-gray-500 text-sm hover:text-gray-300">
                        ← Back to Main Website
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;