import { RiMailSendLine } from 'react-icons/ri'; // Swapped for a more relevant "Email" icon
import { MdArrowBack } from 'react-icons/md';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

// Defined types outside component for cleaner code
interface ForgetPasswordFormProps {
    email: string;
}

const ForgetPasswordPage = () => {

    const initialValues: ForgetPasswordFormProps = {
        email: ''
    };

    const validationSchema = yup.object({
        email: yup.string()
            .email('Please enter a valid email address')
            .required('Email address is required')
    });

    const onSubmitHandler = async (
        values: ForgetPasswordFormProps,
        helper: FormikHelpers<ForgetPasswordFormProps>
    ) => {
        try {
            // Simulate API call
            console.log("Sending reset link to:", values.email);

            // Here you would normally trigger your API
            // await api.auth.forgetPassword(values);

            helper.setSubmitting(false);
            helper.resetForm();
            alert("Reset link sent! (Check console)"); // Replace with Toastify later

        } catch (error) {
            console.error(error);
            helper.setSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                        <RiMailSendLine className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 font-heading">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        No worries! Enter your email and we will send you reset instructions.
                    </p>
                </div>

                {/* Form Section */}
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmitHandler}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">

                            {/* Email Input Field */}
                            <div>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <RiMailSendLine className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Enter your registered email"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow sm:text-sm"
                                    />
                                </div>
                                <ErrorMessage
                                    className="mt-2 text-sm text-red-500 pl-1"
                                    component="p"
                                    name="email"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            {/* Back to Login Link */}
                            <div className="text-center mt-4">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                                >
                                    <MdArrowBack className="mr-2" />
                                    Back to Login
                                </Link>
                            </div>

                        </Form>
                    )}
                </Formik>
            </motion.div>
        </section>
    );
}

export default ForgetPasswordPage;