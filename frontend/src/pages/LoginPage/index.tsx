import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { RiMailSendLine, RiLockPasswordLine } from 'react-icons/ri';
import { CgSpinner } from 'react-icons/cg';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AxiosClient } from '../../config/axiosClient';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/User.slice';
import { AxiosError } from 'axios';

const LoginPage = () => {
    const [isHide, setIsHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    interface LoginFormType {
        email: string;
        password: string;
    }

    const initialValues: LoginFormType = {
        email: '',
        password: ''
    };

    const validationSchema = yup.object({
        email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: yup.string()
            .required('Password is required'),
    });

    const onSubmitHandler = async (values: LoginFormType, helper: FormikHelpers<LoginFormType>) => {
        try {
            setLoading(true);
            const response = await AxiosClient.post("/auth/login", values);
            const data = await response.data;

            // SAFETY CHECK: Ensure data.user exists before saving
            if (data?.user && data?.token) {
                // 1. Save to LocalStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // 2. Dispatch to Redux (Updates Navbar)
                dispatch(setUser(data.user));

                toast.success("Welcome back!");
                helper.resetForm();

                // 3. Redirect to Dashboard
                navigate('/dashboard');
            } else {
                console.error("Login response missing user data:", data);
                toast.error("Login failed: server response missing user data");
            }

        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            const errorMsg = err.response?.data?.error || "Invalid Email or Password";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src='/images/1.jpg'
                    alt="Wedding Couple"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 left-10 z-20 text-white">
                    <h2 className="text-4xl font-bold font-heading">Welcome Back</h2>
                    <p className="text-lg font-sans mt-2 opacity-90">Plan your dream wedding with ease.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 font-heading">Sign In</h2>
                        <p className="text-gray-500 mt-2 font-sans">Please login to access your account</p>
                    </div>

                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={onSubmitHandler}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">

                                {/* Email Field */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiMailSendLine className="text-gray-400 text-lg" />
                                        </div>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white"
                                        />
                                    </div>
                                    <ErrorMessage className="text-red-500 text-xs mt-1 ml-1" component="p" name="email"/>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiLockPasswordLine className="text-gray-400 text-lg" />
                                        </div>
                                        <Field
                                            name="password"
                                            type={isHide ? "password" : "text"}
                                            placeholder="Password"
                                            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsHide(!isHide)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-pink-600 cursor-pointer"
                                        >
                                            {isHide ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </button>
                                    </div>
                                    <ErrorMessage className="text-red-500 text-xs mt-1 ml-1" component="p" name="password"/>
                                </div>

                                {/* Forgot Password Link */}
                                <div className="flex justify-end">
                                    <Link to="/forget" className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={loading || isSubmitting}
                                    type="submit"
                                    className="w-full bg-primary hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <CgSpinner className="animate-spin text-xl" />
                                            Signing In...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer */}
                    <div className="mt-8 text-center text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-pink-600 font-bold hover:underline">
                            Register Now
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default LoginPage;