import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaGlobeAsia, FaStar, FaAward } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGsapReveal from '../hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

const Statistics = () => {
    const sectionRef = useRef(null);
    const headingRef = useGsapReveal('fadeUp', { duration: 0.8 });
    const [hasAnimated, setHasAnimated] = useState(false);
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

    // GSAP ScrollTrigger for number counting + stagger cards
    useEffect(() => {
        const ctx = gsap.context(() => {
            const statCards = sectionRef.current?.querySelectorAll('.stat-card');

            // Stagger stat cards in
            if (statCards && statCards.length > 0) {
                gsap.fromTo(statCards, {
                    opacity: 0,
                    y: 60,
                    scale: 0.8,
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'back.out(1.5)',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                        onEnter: () => setHasAnimated(true),
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Count up animation using GSAP
    useEffect(() => {
        if (!hasAnimated) return;

        stats.forEach((stat) => {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: stat.end,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                    setCounts(prev => ({
                        ...prev,
                        [stat.key]: stat.decimals
                            ? parseFloat(obj.val.toFixed(stat.decimals))
                            : Math.floor(obj.val)
                    }));
                },
            });
        });
    }, [hasAnimated]);

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-india-blue-700 via-india-blue-600 to-india-blue-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-india-saffron-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Achievements
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Numbers that speak for our excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="stat-card text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-center mb-4"
                            >
                                {stat.icon}
                            </motion.div>
                            <div className="text-5xl font-bold text-white mb-2">
                                {counts[stat.key].toLocaleString()}{stat.suffix}
                            </div>
                            <p className="text-xl text-white/90">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
