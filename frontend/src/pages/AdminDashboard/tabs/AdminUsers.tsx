import { useEffect, useState } from 'react';
import { AxiosClient } from '../../../config/axiosClient';
import { FaTrash, FaUserCircle, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        const token = localStorage.getItem("adminToken");
        const res = await AxiosClient.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
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
        if(!confirm("Are you sure you want to ban this user?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await AxiosClient.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    return (
        <div>
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                    <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Joined</th>
                        <th className="p-4 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-3">
                                <FaUserCircle className="text-gray-300 text-2xl" />
                                <span className="font-bold text-gray-700">{user.name}</span>
                            </td>
                            <td className="p-4 text-gray-600">{user.email}</td>
                            <td className="p-4 text-gray-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                                <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;