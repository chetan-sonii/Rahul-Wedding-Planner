import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPasswordPage from "../pages/ForgetPage";
import DashboardPage from "../pages/DashboardPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ProtectedRoutes from "./ProtectedRoutes";
import VendorListingPage from "../pages/VendorListingPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminDashboard from "../pages/AdminDashboard"; // <--- IMPORT THIS

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            { path: '', Component: HomePage },
            { path: 'login', Component: LoginPage },
            { path: 'register', Component: RegisterPage },
            { path: 'forget', Component: ForgetPasswordPage },
            { path: 'about', Component: AboutPage },
            { path: 'contact', Component: ContactPage },
            {
                Component: ProtectedRoutes,
                children: [
                    {
                        path: 'dashboard',
                        Component: DashboardPage
                    }
                ]
            },
            {
                path: 'vendors',
                Component: VendorListingPage
            },
            {
                path: "reset-password/:token",
                Component: ResetPasswordPage
            },
            { path: "admin/login", Component: AdminLoginPage },
            { path: "admin/dashboard", Component: AdminDashboard },

        ]
    }
]);