import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ModernSlider = () => {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop',
            title: 'Taj Mahal',
            subtitle: 'Agra, India',
            description: 'Symbol of eternal love',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop',
            title: 'Kashmir Valley',
            subtitle: 'Jammu & Kashmir',
            description: 'Paradise on Earth',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
            title: 'Goa Beaches',
            subtitle: 'Goa, India',
            description: 'Sun, sand & sea',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
            title: 'Kerala Backwaters',
            subtitle: 'Kerala, India',
            description: 'Serene waterways',
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop',
            title: 'Jaipur',
            subtitle: 'Rajasthan, India',
            description: 'The Pink City',
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop',
            title: 'Varanasi Ghats',
            subtitle: 'Uttar Pradesh',
            description: 'Spiritual awakening',
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
            title: 'Manali',
            subtitle: 'Himachal Pradesh',
            description: 'Adventure paradise',
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop',
            title: 'Mysore Palace',
            subtitle: 'Karnataka, India',
            description: 'Architectural marvel',
        },
    ];

    const duplicatedSlides = [...slides, ...slides, ...slides];

    // Handle touch events for mobile
    const handleTouchStart = (e) => {
        setIsPaused(true);
    };

    const handleTouchEnd = (e) => {
        setIsPaused(false);
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId;
        const scrollSpeed = 0.5; // Consistent slower speed

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                scrollContainer.scrollLeft += scrollSpeed;
                const maxScroll = scrollContainer.scrollWidth / 3;
                if (scrollContainer.scrollLeft >= maxScroll) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isPaused]);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-india-blue-800 mb-4">
                        Trending Destinations
                    </h2>
                    <p className="text-xl text-gray-600">
                        Explore the most popular travel spots across India
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative cursor-pointer select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Gradient fades */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden py-4"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {duplicatedSlides.map((slide, index) => (
                        <motion.div
                            key={`${slide.id}-${index}`}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="flex-shrink-0 w-64 h-80 relative rounded-2xl overflow-hidden shadow-lg group"
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
                                <p className="text-india-saffron-400 text-sm font-semibold mb-1">{slide.subtitle}</p>
                                <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
                                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {slide.description}
                                </p>

                                {/* Explore button - appears on hover */}
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="mt-3 px-5 py-2 bg-white text-india-blue-800 font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm shadow-lg"
                                >
                                    Explore →
                                </motion.button>
                            </div>

                            {/* Border glow on hover */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-india-saffron-400/60 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ModernSlider;
