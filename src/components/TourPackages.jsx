import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGsapReveal from '../hooks/useGsapReveal';
import { fetchPackages } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

const TourPackages = ({ preview = false }) => {
    const sectionRef = useRef(null);
    const headingRef = useGsapReveal('fadeUp', { duration: 0.8 });
    const filterRef = useGsapReveal('fadeUp', { delay: 0.2, duration: 0.6 });
    const [filter, setFilter] = useState('all');
    const [packages, setPackages] = useState([]);
    const [pkgLoading, setPkgLoading] = useState(true);

    useEffect(() => {
        fetchPackages()
            .then(data => {
                // public site only shows active packages
                setPackages(data.filter(p => p.status === 'active' || !p.status));
                setPkgLoading(false);
            })
            .catch(() => setPkgLoading(false));
    }, []);

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

    // GSAP stagger for package cards
    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll('.package-card');
            if (cards && cards.length > 0) {
                gsap.fromTo(cards, {
                    opacity: 0,
                    y: 60,
                    rotateX: -10,
                    transformOrigin: '50% 100%',
                }, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [filter]);

    return (
        <section ref={sectionRef} id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div ref={headingRef} className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-india-blue-800 mb-4">
                        India Tour Packages
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the best of India with our carefully curated tour packages
                    </p>
                </div>

                {/* Filter Buttons */}
                {!preview && (
                    <div ref={filterRef} className="flex flex-wrap justify-center gap-4 mb-12">
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
                    </div>
                )}

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(preview ? filteredPackages.slice(0, 3) : filteredPackages).map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            whileHover={{ y: -15 }}
                            className="package-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <motion.img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-700"
                                    whileHover={{ scale: 1.15, filter: "brightness(1.1)" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

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

                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-india-saffron-300/50 transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TourPackages;
