import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TourPackages = ({ preview = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [filter, setFilter] = useState('all');

    const packages = [
        {
            id: 1,
            name: 'Golden Triangle Tour',
            destinations: 'Delhi – Agra – Jaipur',
            duration: '5 Days / 4 Nights',
            price: '₹15,999',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop',
            category: 'heritage',
            emoji: '🏛️'
        },
        {
            id: 2,
            name: 'Kerala Backwaters Tour',
            destinations: 'Munnar – Alleppey – Kochi',
            duration: '6 Days / 5 Nights',
            price: '₹18,999',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2048&auto=format&fit=crop',
            category: 'beach',
            emoji: '🏝️'
        },
        {
            id: 3,
            name: 'Kashmir Paradise Tour',
            destinations: 'Srinagar – Gulmarg – Pahalgam',
            duration: '5 Days / 4 Nights',
            price: '₹22,999',
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2787&auto=format&fit=crop',
            category: 'mountain',
            emoji: '🏔️'
        },
        {
            id: 4,
            name: 'Himachal Adventure Tour',
            destinations: 'Manali – Kasol – Shimla',
            duration: '6 Days / 5 Nights',
            price: '₹17,499',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
            category: 'adventure',
            emoji: '🏔️'
        },
        {
            id: 5,
            name: 'Goa Beach Holiday',
            destinations: 'North & South Goa',
            duration: '4 Days / 3 Nights',
            price: '₹12,999',
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
            category: 'beach',
            emoji: '🏖️'
        },
        {
            id: 6,
            name: 'Rajasthan Royal Tour',
            destinations: 'Jaipur – Jodhpur – Udaipur',
            duration: '7 Days / 6 Nights',
            price: '₹25,999',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop',
            category: 'heritage',
            emoji: '🏜️'
        },
    ];

    const filters = [
        { name: 'All Packages', value: 'all' },
        { name: 'Beach', value: 'beach' },
        { name: 'Mountain', value: 'mountain' },
        { name: 'Heritage', value: 'heritage' },
        { name: 'Adventure', value: 'adventure' },
    ];

    const filteredPackages = filter === 'all'
        ? packages
        : packages.filter(pkg => pkg.category === filter);

    return (
        <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-india-blue-800 mb-4">
                        India Tour Packages
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the best of India with our carefully curated tour packages
                    </p>
                </motion.div>

                {/* Filter Buttons - Hidden in preview mode */}
                {!preview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {filters.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setFilter(item.value)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === item.value
                                    ? 'bg-india-blue-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Packages Grid */}
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(preview ? filteredPackages.slice(0, 3) : filteredPackages).map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -15 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <motion.img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="w-full h-full object-cover transition-all duration-700"
                                    whileHover={{ scale: 1.15, filter: "brightness(1.1)" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-india-saffron-500/40 via-transparent to-india-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                    <span className="text-2xl">{pkg.emoji}</span>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white/90 text-sm font-medium bg-india-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                        {pkg.duration}
                                    </span>
                                </div>

                                {/* Book Now button that appears on hover */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-white text-india-blue-800 font-bold rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        Book Now
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                {/* Subtle gradient background on card */}
                                <div className="absolute inset-0 bg-gradient-to-br from-india-blue-50/0 to-india-saffron-50/0 group-hover:from-india-blue-50/50 group-hover:to-india-saffron-50/50 transition-all duration-500 rounded-b-2xl" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-india-blue-800 mb-2 group-hover:text-india-blue-900 transition-colors">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">{pkg.destinations}</p>

                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Starting from</p>
                                            <p className="text-2xl font-bold text-india-saffron-600 group-hover:text-india-saffron-700 transition-colors">
                                                {pkg.price}
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.08, boxShadow: "0 10px 25px rgba(0, 86, 214, 0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 bg-india-blue-600 text-white font-semibold rounded-full hover:bg-india-blue-700 transition-all duration-300 shadow-md"
                                        >
                                            View Details
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Glowing border effect on hover */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-india-saffron-300/50 transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TourPackages;
