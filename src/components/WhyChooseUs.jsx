import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCheckCircle, FaHeadset, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            id: 1,
            icon: <FaCheckCircle className="text-5xl text-india-saffron-500" />,
            title: 'Best Price Guarantee',
            description: 'We offer the most competitive prices for all our tour packages without compromising quality.',
        },
        {
            id: 2,
            icon: <FaHeadset className="text-5xl text-india-saffron-500" />,
            title: '24/7 Support',
            description: 'Our dedicated team is available round the clock to assist you throughout your journey.',
        },
        {
            id: 3,
            icon: <FaMapMarkedAlt className="text-5xl text-india-saffron-500" />,
            title: 'Custom Itineraries',
            description: 'Personalized travel plans tailored to your preferences and requirements.',
        },
        {
            id: 4,
            icon: <FaUsers className="text-5xl text-india-saffron-500" />,
            title: 'Trusted by 10,000+ Travelers',
            description: 'Join thousands of satisfied travelers who have experienced India with us.',
        },
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-india-blue-800 mb-4">
                        Why Choose Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your trusted partner for unforgettable journeys across India
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-center mb-4"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-xl font-bold text-india-blue-800 mb-3 group-hover:text-india-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
