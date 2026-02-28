import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
        { name: 'Vehicles', path: '/vehicles' },
        { name: 'Book Ride', path: '/booking' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundColor: isScrolled ? 'white' : 'transparent',
                boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            }}
            className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <Link to="/" className="text-2xl font-bold">
                            <span style={{ color: isScrolled ? '#1e3a8a' : '#ffffff' }}>XYZ</span>
                            <span className="text-india-saffron-500"> Tours</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    color: isScrolled
                                        ? location.pathname === link.path ? '#1e3a8a' : '#1f2937'
                                        : location.pathname === link.path ? '#fbbf24' : '#ffffff',
                                }}
                                className="relative group text-base font-medium transition-colors hover:opacity-80"
                            >
                                {link.name}
                                <span
                                    style={{ backgroundColor: isScrolled ? '#1e3a8a' : '#ffffff' }}
                                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : 'w-0'}`}
                                ></span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{ color: isScrolled ? '#1f2937' : '#ffffff' }}
                        >
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white shadow-lg"
                >
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block font-medium ${location.pathname === link.path
                                    ? 'text-india-blue-700'
                                    : 'text-gray-700 hover:text-india-blue-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
