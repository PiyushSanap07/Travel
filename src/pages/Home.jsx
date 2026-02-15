import React from 'react';
import Hero from '../components/Hero';
import ModernSlider from '../components/ModernSlider';
import TourPackages from '../components/TourPackages';
import WhyChooseUs from '../components/WhyChooseUs';
import InstagramGallery from '../components/InstagramGallery';
import Testimonials from '../components/Testimonials';
import NewsletterCTA from '../components/NewsletterCTA';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <>
            <Hero />
            <ModernSlider />

            {/* Popular Packages Preview Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-india-blue-800 mb-4">
                            Popular Tour Packages
                        </h2>
                        <p className="text-xl text-gray-600">
                            Handpicked tours for the perfect getaway
                        </p>
                    </motion.div>

                    {/* Show limited packages - we'll modify TourPackages component to accept a limit prop later */}
                    <TourPackages preview={true} />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <Link to="/packages">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0, 86, 214, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-gradient-to-r from-india-blue-600 to-india-blue-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                View All Packages
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <WhyChooseUs />
            <InstagramGallery />

            {/* Testimonials Preview */}
            <Testimonials preview={true} />

            <NewsletterCTA />
        </>
    );
};

export default Home;
