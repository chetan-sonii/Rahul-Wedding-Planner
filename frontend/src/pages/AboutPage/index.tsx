import React from 'react';
import { FaHeart, FaHandshake, FaGem, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

// Interface for Value Card Props
interface ValueCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const AboutPage = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" alt="Wedding Background" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-6"
                    >
                        We Plan, You <span className="text-primary">Celebrate.</span>
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        SubhVivah is India's most trusted wedding planning platform. We connect couples with top-tier vendors to turn dream weddings into reality.
                    </p>
                </div>
            </section>

            {/* Our Story / Mission */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-100 rounded-full -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
                            alt="Our Story"
                            className="rounded-3xl shadow-xl w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg max-w-xs hidden md:block">
                            <p className="font-heading font-bold text-xl text-primary">"Seamless Planning"</p>
                            <p className="text-sm text-gray-500 mt-2">We handle the chaos so you can enjoy the moment.</p>
                        </div>
                    </div>
                    <div>
                        <span className="text-primary font-bold text-sm uppercase tracking-widest">Our Mission</span>
                        <h2 className="text-4xl font-heading font-bold text-gray-900 mt-2 mb-6">Redefining Indian Weddings</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Planning an Indian wedding can be overwhelming. From finding the perfect venue to coordinating with dozens of vendors, the stress adds up.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            At SubhVivah, we simplify this journey. We provide a curated marketplace of verified vendors, smart budgeting tools, and personalized checklists—all in one place.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <Stat number="500+" label="Weddings Planned" />
                            <Stat number="1000+" label="Verified Vendors" />
                            <Stat number="50+" label="Cities Covered" />
                            <Stat number="4.9" label="User Rating" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold text-sm uppercase tracking-widest">Why Choose Us</span>
                        <h2 className="text-4xl font-heading font-bold text-gray-900 mt-2">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <ValueCard icon={<FaHeart />} title="Passion" desc="We love love. Every wedding is special to us." />
                        <ValueCard icon={<FaHandshake />} title="Trust" desc="Verified vendors only. No hidden surprises." />
                        <ValueCard icon={<FaGem />} title="Quality" desc="Premium services for every budget." />
                        <ValueCard icon={<FaUserFriends />} title="Community" desc="Join thousands of happy couples." />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-heading font-bold mb-6">Ready to Plan Your Dream Wedding?</h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Join thousands of couples who planned their perfect day with SubhVivah.
                    </p>
                    <Link to="/register" className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                        Get Started for Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

const Stat = ({ number, label }: { number: string, label: string }) => (
    <div>
        <p className="text-3xl font-bold text-primary">{number}</p>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
    </div>
);

// Fixed ValueCard with proper type
const ValueCard = ({ icon, title, desc }: ValueCardProps) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
        <div className="w-16 h-16 mx-auto bg-pink-50 text-primary rounded-full flex items-center justify-center text-2xl mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
);

export default AboutPage;