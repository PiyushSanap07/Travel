import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [displayText, setDisplayText] = useState('');
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const phrases = ['Incredible India', 'Paradise on Earth', 'Your Dream Destination', 'Adventure Awaits'];

    // Typewriter effect
    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = isDeleting ? 500 : 2000;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayText === currentPhrase) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
            } else {
                setDisplayText(
                    isDeleting
                        ? currentPhrase.substring(0, displayText.length - 1)
                        : currentPhrase.substring(0, displayText.length + 1)
                );
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhraseIndex]);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden z-0">
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0 z-[1]"
                style={{ y: y1 }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-india-blue-900/80 via-india-blue-800/70 to-india-saffron-900/40"></div>

                {/* Animated gradient overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-india-saffron-500/20 via-transparent to-india-blue-600/20"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Enhanced Floating Decorative Elements */}
            <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-20 right-20 w-32 h-32 bg-india-saffron-400/30 rounded-full blur-3xl"
                style={{
                    x: mousePosition.x * 2,
                    y: mousePosition.y * 2,
                }}
            />
            <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1, duration: 4 }}
                className="absolute bottom-40 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                style={{
                    x: mousePosition.x * -1.5,
                    y: mousePosition.y * -1.5,
                }}
            />
            <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.5, duration: 5 }}
                className="absolute top-1/2 left-1/4 w-24 h-24 bg-india-blue-400/20 rounded-full blur-2xl"
                style={{
                    x: mousePosition.x * 3,
                    y: mousePosition.y * 3,
                }}
            />

            {/* Content with stagger animation */}
            <motion.div
                className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    opacity,
                    x: mousePosition.x * 0.5,
                    y: mousePosition.y * 0.5,
                }}
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                >
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Discover the{' '}
                    </motion.span>
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-india-saffron-300 via-india-saffron-400 to-india-saffron-500">
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Curated tour packages across India's most breathtaking destinations.
                    <br />
                    <span className="text-india-saffron-300 font-medium">Your adventure starts here!</span>
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.a
                        href="#packages"
                        whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(255, 143, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-gradient-to-r from-india-saffron-500 to-india-saffron-600 text-white font-bold rounded-full shadow-2xl hover:shadow-india-saffron-500/50 transition-all duration-300"
                    >
                        Explore Packages
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/40 hover:border-white/60 transition-all duration-300"
                    >
                        Get Custom Plan
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{ y: y2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[6]"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-7 h-12 border-2 border-white/60 rounded-full flex justify-center p-2"
                >
                    <motion.div
                        className="w-1.5 h-3 bg-white rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                    />
                </motion.div>
                <p className="text-white/70 text-sm mt-3 font-medium tracking-wider">SCROLL</p>
            </motion.div>
        </section>
    );
};

export default Hero;
