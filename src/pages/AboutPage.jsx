import React, { useEffect, useRef } from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import Statistics from '../components/Statistics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGsapReveal from '../hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const headerRef = useGsapReveal('fadeUp', { duration: 0.8, start: 'top 90%' });
    const storyRef = useRef(null);
    const missionRef = useRef(null);

    // GSAP alternating fade left/right for story sections
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (storyRef.current) {
                gsap.fromTo(storyRef.current, {
                    opacity: 0,
                    x: -60,
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: storyRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });
            }

            if (missionRef.current) {
                gsap.fromTo(missionRef.current, {
                    opacity: 0,
                    x: 60,
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: missionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div>
            {/* Page Header */}
            <section className="py-20 bg-gradient-to-br from-india-blue-700 via-india-blue-600 to-india-blue-800 relative overflow-hidden z-0">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[5]">
                    <div ref={headerRef} className="text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            About XYZ Tours
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                            Your trusted partner for unforgettable journeys across India
                        </p>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <div ref={storyRef}>
                            <h2 className="text-3xl font-bold text-india-blue-800 mb-6">Our Story</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                At XYZ Tours, we believe that travel is more than just visiting new places—it's about creating lasting memories,
                                experiencing diverse cultures, and discovering the extraordinary beauty that India has to offer.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                With over 15 years of experience in the travel industry, we've helped thousands of travelers explore India's
                                most captivating destinations. From the snow-capped peaks of Kashmir to the sun-kissed beaches of Goa,
                                from the royal palaces of Rajasthan to the serene backwaters of Kerala—we curate experiences that go beyond ordinary tourism.
                            </p>
                        </div>
                        <div ref={missionRef}>
                            <h2 className="text-3xl font-bold text-india-blue-800 mb-6 mt-12">Our Mission</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                To provide exceptional, personalized travel experiences that showcase the rich cultural heritage,
                                natural beauty, and warm hospitality of India while ensuring the highest standards of comfort, safety, and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Statistics />
            <WhyChooseUs />
        </div>
    );
};

export default AboutPage;
