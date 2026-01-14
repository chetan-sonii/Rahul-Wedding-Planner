import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa6';
import { RiMailSendLine, RiLockPasswordLine } from 'react-icons/ri';
import { CgSpinner } from 'react-icons/cg';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router'; // Correct import for v7
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AxiosClient } from '../../config/axiosClient';
import { AxiosError } from 'axios';

const RegisterPage = () => {
    const [isHide, setIsHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    interface RegisterFormProps {
        name: string;
        email: string;
        password: string;
    }

    const initialValues: RegisterFormProps = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = yup.object({
        name: yup.string().required("Full Name is required"),
        email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const onSubmitHandler = async (values: RegisterFormProps, helper: FormikHelpers<RegisterFormProps>) => {
        try {
            setLoading(true);
            const response = await AxiosClient.post("/auth/register", values);
            const data = await response.data;

            toast.success(data.msg || "Registration Successful! Please Login.");
            helper.resetForm();

            // Redirect to Login Page
            navigate('/login');

        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            const errorMsg = err.response?.data?.error || "Registration failed";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden order-2">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src="/images/2.jpg"
                    alt="Wedding Venue"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 left-10 z-20 text-white">
                    <h2 className="text-4xl font-bold font-heading">Begin the Journey</h2>
                    <p className="text-lg font-sans mt-2 opacity-90">Create an account to manage your big day.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50 order-1">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 font-heading">Create Account</h2>
                        <p className="text-gray-500 mt-2 font-sans">Sign up to get started</p>
                    </div>

                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={onSubmitHandler}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">

                                {/* Name Field */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaRegUser className="text-gray-400" />
                                        </div>
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white"
                                        />
                                    </div>
                                    <ErrorMessage className="text-red-500 text-xs mt-1 ml-1" component="p" name="name"/>
                                </div>

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
                                            placeholder="Create Password"
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

                                {/* Submit Button */}
                                <button
                                    disabled={loading || isSubmitting}
                                    type="submit"
                                    className="w-full bg-primary hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <CgSpinner className="animate-spin text-xl" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer */}
                    <div className="mt-8 text-center text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-pink-600 font-bold hover:underline">
                            Sign In
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default RegisterPage;