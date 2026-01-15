import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Interface for Input Field Props
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 font-sans pt-10 pb-20"
        >
            {/* Header Section */}
            <div className="bg-primary py-20 text-center text-white mb-[-80px] pb-32">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get in Touch</h1>
                <p className="text-lg opacity-90 max-w-2xl mx-auto px-4">
                    Have questions about planning your big day? We're here to help you every step of the way.
                </p>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left: Contact Info */}
                    <div className="md:w-2/5 bg-gray-900 text-white p-10 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold font-heading mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg"><FaPhoneAlt className="text-primary" /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Call Us</p>
                                        <p className="font-medium text-lg">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg"><FaEnvelope className="text-primary" /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Email Us</p>
                                        <p className="font-medium text-lg">support@subhvivah.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg"><FaMapMarkerAlt className="text-primary" /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Visit Us</p>
                                        <p className="font-medium text-lg">123 Wedding Lane, Koramangala<br/>Bangalore, India 560034</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-sm text-gray-400 mb-4">Follow us for wedding inspo</p>
                            <div className="flex gap-4">
                                <SocialIcon icon={<FaFacebook />} />
                                <SocialIcon icon={<FaInstagram />} />
                                <SocialIcon icon={<FaTwitter />} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="md:w-3/5 p-10 lg:p-14">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message" rows={4}
                                    value={formData.message} onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-pink-100 transition-all resize-none"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition-all flex items-center gap-2 shadow-lg shadow-pink-200">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

// Fixed InputField with proper type
const InputField = ({ label, ...props }: InputFieldProps) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
        <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-pink-100 transition-all"
            {...props}
        />
    </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
        {icon}
    </a>
);

export default ContactPage;