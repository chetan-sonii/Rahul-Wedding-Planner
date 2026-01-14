import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

// 1. Define the Redux State Interface
interface RootState {
    UserSlice: {
        user: any;
    } | undefined; // Make the slice itself optional
}

const ProtectedRoutes = () => {
    // 2. Safe Selector: We access the whole slice first
    const userSlice = useSelector((state: RootState) => state.UserSlice);

    // 3. Fallback: If userSlice is undefined, user is null
    const user = userSlice?.user || null;

    // 4. Check LocalStorage as a backup (Standard practice for persistence)
    const token = localStorage.getItem("token");

    // If neither Redux user nor Token exists, redirect to login
    if (!user && !token) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, allow access
    return <Outlet />;
};

export default ProtectedRoutes;