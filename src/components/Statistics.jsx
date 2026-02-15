import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaUsers, FaGlobeAsia, FaStar, FaAward } from 'react-icons/fa';

const Statistics = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [counts, setCounts] = useState({
        travelers: 0,
        destinations: 0,
        rating: 0,
        awards: 0,
    });

    const stats = [
        {
            id: 1,
            icon: <FaUsers className="text-5xl text-white" />,
            end: 10000,
            suffix: '+',
            label: 'Happy Travelers',
            key: 'travelers'
        },
        {
            id: 2,
            icon: <FaGlobeAsia className="text-5xl text-white" />,
            end: 50,
            suffix: '+',
            label: 'Destinations',
            key: 'destinations'
        },
        {
            id: 3,
            icon: <FaStar className="text-5xl text-white" />,
            end: 4.8,
            suffix: '/5',
            label: 'Average Rating',
            key: 'rating',
            decimals: 1
        },
        {
            id: 4,
            icon: <FaAward className="text-5xl text-white" />,
            end: 15,
            suffix: '+',
            label: 'Awards Won',
            key: 'awards'
        },
    ];

    useEffect(() => {
        if (!isInView) return;

        stats.forEach((stat) => {
            let start = 0;
            const increment = stat.end / 100;
            const timer = setInterval(() => {
                start += increment;
                if (start >= stat.end) {
                    setCounts(prev => ({ ...prev, [stat.key]: stat.end }));
                    clearInterval(timer);
                } else {
                    setCounts(prev => ({
                        ...prev,
                        [stat.key]: stat.decimals ? parseFloat(start.toFixed(stat.decimals)) : Math.floor(start)
                    }));
                }
            }, 20);
        });
    }, [isInView]);

    return (
        <section className="py-20 bg-gradient-to-br from-india-blue-700 via-india-blue-600 to-india-blue-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-india-saffron-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Achievements
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Numbers that speak for our excellence
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-center mb-4"
                            >
                                {stat.icon}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                className="text-5xl font-bold text-white mb-2"
                            >
                                {counts[stat.key].toLocaleString()}{stat.suffix}
                            </motion.div>
                            <p className="text-xl text-white/90">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
