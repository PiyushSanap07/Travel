import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

// Module-level flag: persists across React Router navigations, resets on page refresh
let hasPlayedIntro = false;

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(hasPlayedIntro);

    // Refs
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);
    const headingLineRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const overlayRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const spotlightRef = useRef(null);
    const lightTrailRef = useRef(null);

    const phrases = ['Incredible India', 'Paradise on Earth', 'Your Dream Destination', 'Adventure Awaits'];

    // Premium destination cards
    const heroCards = [
        {
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=400&auto=format&fit=crop',
            title: 'Taj Mahal',
            tag: 'Heritage',
            color: '#F59E0B',
        },
        {
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=400&auto=format&fit=crop',
            title: 'Kashmir',
            tag: 'Mountain',
            color: '#3B82F6',
        },
        {
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
            title: 'Goa',
            tag: 'Beach',
            color: '#10B981',
        },
        {
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=400&auto=format&fit=crop',
            title: 'Kerala',
            tag: 'Nature',
            color: '#8B5CF6',
        },
        {
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop',
            title: 'Jaipur',
            tag: 'Royal',
            color: '#EC4899',
        },
        {
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=400&auto=format&fit=crop',
            title: 'Manali',
            tag: 'Adventure',
            color: '#06B6D4',
        },
    ];

    // Typewriter effect — only starts after card animation completes
    useEffect(() => {
        if (!animationComplete) return;

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
    }, [displayText, isDeleting, currentPhraseIndex, animationComplete]);

    // GSAP Master Animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsContainerRef.current?.querySelectorAll('.hero-card');
            const glowRings = cardsContainerRef.current?.querySelectorAll('.glow-ring');

            // ====== SKIP INTRO IF ALREADY PLAYED (Router navigation) ======
            if (hasPlayedIntro) {
                // Show everything instantly, no card animation
                gsap.set(bgRef.current, { scale: 1.1, opacity: 1 });
                gsap.set(overlayRef.current, { opacity: 1 });
                gsap.set(spotlightRef.current, { opacity: 0 });
                gsap.set(lightTrailRef.current, { opacity: 0 });
                if (cards) gsap.set(cards, { opacity: 0, scale: 0 }); // hide cards
                const headingChars = headingLineRef.current?.querySelectorAll('.char');
                if (headingChars) gsap.set(headingChars, { opacity: 1, y: 0, rotateX: 0 });
                gsap.set(subtitleRef.current, { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });
                const ctaButtons = ctaRef.current?.querySelectorAll('.cta-button');
                if (ctaButtons) gsap.set(ctaButtons, { opacity: 1, y: 0, scale: 1 });
                gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 });

                // Still set up scroll parallax
                gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-dot'), {
                    y: 8, opacity: 0.3, duration: 0.9, repeat: -1, yoyo: true, ease: 'power1.inOut',
                });

                gsap.to(bgRef.current, {
                    y: 200, ease: 'none',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
                });
                gsap.to(contentRef.current, {
                    y: -80, opacity: 0, ease: 'none',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: true },
                });
                gsap.to(scrollIndicatorRef.current, {
                    opacity: 0, y: -30, ease: 'none',
                    scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '30% top', scrub: true },
                });
                gsap.to(overlayRef.current, {
                    opacity: 0.2, ease: 'none',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
                });

                return; // Skip the full intro
            }

            // ====== FULL INTRO ANIMATION (first load only) ======
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            if (cards && cards.length > 0) {
                // ============================================
                // PHASE 1: CINEMATIC BLACK SCREEN + SPOTLIGHT
                // ============================================
                // Start with dark bg, spotlight in center
                gsap.set(spotlightRef.current, { opacity: 0 });
                gsap.set(lightTrailRef.current, { opacity: 0 });

                // Pulse the spotlight in
                tl.to(spotlightRef.current, {
                    opacity: 0.6,
                    duration: 0.8,
                    ease: 'power2.in',
                });

                // ============================================
                // PHASE 2: CARDS DEAL IN WITH 3D FLIP
                // ============================================
                // Cards start invisible, off-screen below, face-down (rotateY 180)
                gsap.set(cards, {
                    x: 0,
                    y: 300,
                    rotateY: 180,
                    rotateZ: 0,
                    scale: 0,
                    opacity: 0,
                    zIndex: (i) => 10 + cards.length - i,
                    transformPerspective: 1200,
                    transformStyle: 'preserve-3d',
                });

                gsap.set(glowRings, { scale: 0, opacity: 0 });

                // Each card flies up, flips to face-forward, and stacks with tilt
                cards.forEach((card, i) => {
                    const fanAngle = (i - 2.5) * 10; // -25, -15, -5, 5, 15, 25 degrees
                    const yOffset = Math.abs(i - 2.5) * -6; // arc shape

                    tl.to(card, {
                        opacity: 1,
                        y: yOffset,
                        scale: 1,
                        rotateY: 0,
                        rotateZ: fanAngle,
                        duration: 0.5,
                        ease: 'back.out(1.4)',
                    }, i === 0 ? '+=0' : '-=0.35');

                    // Glow ring pulses as each card lands
                    tl.to(glowRings[i], {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    }, '<0.2');

                    tl.to(glowRings[i], {
                        scale: 1.8,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    }, '<0.1');
                });

                // Hold the fanned deck for a beat
                tl.to({}, { duration: 0.6 });

                // ============================================
                // PHASE 3: LIGHT TRAIL + CARDS EXPLODE OUTWARD
                // ============================================
                // Flash the light trail
                tl.to(lightTrailRef.current, {
                    opacity: 0.8,
                    scaleX: 3,
                    duration: 0.3,
                    ease: 'power4.in',
                });

                tl.to(lightTrailRef.current, {
                    opacity: 0,
                    scaleX: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                });

                // Dim the spotlight as bg reveals
                tl.to(spotlightRef.current, {
                    opacity: 0,
                    scale: 3,
                    duration: 1.2,
                    ease: 'power2.inOut',
                }, '<');

                // Background reveals with cinematic feel
                tl.fromTo(bgRef.current,
                    { scale: 1.4, opacity: 0 },
                    { scale: 1.1, opacity: 1, duration: 1.5, ease: 'power2.out' },
                    '<'
                );

                tl.fromTo(overlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1 },
                    '<0.3'
                );

                // Cards explode outward to screen edges with 3D depth
                const explodePositions = [
                    { x: -650, y: -250, rotateZ: -25, rotateY: -15, scale: 0.55 },
                    { x: 600, y: -280, rotateZ: 18, rotateY: 12, scale: 0.5 },
                    { x: -700, y: 180, rotateZ: 12, rotateY: 10, scale: 0.45 },
                    { x: 650, y: 200, rotateZ: -15, rotateY: -8, scale: 0.5 },
                    { x: -350, y: -320, rotateZ: 8, rotateY: 5, scale: 0.4 },
                    { x: 400, y: 260, rotateZ: -10, rotateY: -6, scale: 0.45 },
                ];

                cards.forEach((card, i) => {
                    tl.to(card, {
                        x: explodePositions[i].x,
                        y: explodePositions[i].y,
                        rotateZ: explodePositions[i].rotateZ,
                        rotateY: explodePositions[i].rotateY,
                        scale: explodePositions[i].scale,
                        opacity: 0.85,
                        duration: 1.2,
                        ease: 'power3.inOut',
                    }, '<0.08');
                });

            } else {
                // Fallback
                tl.fromTo(bgRef.current,
                    { scale: 1.3, opacity: 0 },
                    { scale: 1.1, opacity: 1, duration: 2, ease: 'power2.out' }
                );
                tl.fromTo(overlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1.5 },
                    '<0.3'
                );
            }

            // ============================================
            // PHASE 4: HERO CONTENT REVEALS
            // ============================================
            const headingChars = headingLineRef.current?.querySelectorAll('.char');
            if (headingChars && headingChars.length > 0) {
                tl.fromTo(headingChars, {
                    opacity: 0,
                    y: 80,
                    rotateX: -90,
                    transformOrigin: '50% 50% -30px',
                }, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    stagger: 0.03,
                }, '-=0.5');
            }

            // Subtitle clip-path
            tl.fromTo(subtitleRef.current, {
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                opacity: 0,
            }, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                opacity: 1,
                duration: 0.8,
                ease: 'power4.inOut',
            }, '-=0.3');

            // CTA stagger
            const ctaButtons = ctaRef.current?.querySelectorAll('.cta-button');
            if (ctaButtons && ctaButtons.length > 0) {
                tl.fromTo(ctaButtons, {
                    opacity: 0,
                    y: 40,
                    scale: 0.8,
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(2)',
                    stagger: 0.15,
                }, '-=0.3');
            }

            // Mark animation as complete so typewriter can start
            tl.call(() => {
                setAnimationComplete(true);
                hasPlayedIntro = true;
            });

            // Scroll indicator
            tl.fromTo(scrollIndicatorRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                '-=0.1'
            );

            // ============================================
            // PHASE 5: CARDS FADE OUT GRACEFULLY
            // ============================================
            if (cards && cards.length > 0) {
                tl.to(cards, {
                    opacity: 0,
                    scale: 0.3,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'power2.in',
                }, '-=0.3');
            }

            // ===== CONTINUOUS ANIMATIONS =====
            gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-dot'), {
                y: 8,
                opacity: 0.3,
                duration: 0.9,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            // ===== SCROLL PARALLAX =====
            gsap.to(bgRef.current, {
                y: 200,
                ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
            });

            gsap.to(contentRef.current, {
                y: -80,
                opacity: 0,
                ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: true },
            });

            gsap.to(scrollIndicatorRef.current, {
                opacity: 0,
                y: -30,
                ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '30% top', scrub: true },
            });

            gsap.to(overlayRef.current, {
                opacity: 0.2,
                ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split text into characters
    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span
                key={i}
                className="char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden z-0 bg-[#0a0f1c]"
        >
            {/* Cinematic Spotlight (GSAP animated) */}
            <div
                ref={spotlightRef}
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(245,158,11,0.15) 0%, rgba(30,58,138,0.08) 40%, transparent 70%)',
                    opacity: 0,
                }}
            />

            {/* Light Trail Flash (GSAP animated) */}
            <div
                ref={lightTrailRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 z-[4] pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.6) 30%, rgba(255,255,255,0.9) 50%, rgba(245,158,11,0.6) 70%, transparent 100%)',
                    opacity: 0,
                }}
            />

            {/* Parallax Background Image */}
            <div className="absolute inset-0 z-[1]">
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 will-change-transform"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop')`,
                        opacity: 0,
                    }}
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-r from-india-blue-900/80 via-india-blue-800/70 to-india-saffron-900/40"
                    style={{ opacity: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-india-saffron-500/20 via-transparent to-india-blue-600/20 opacity-30" />
            </div>

            {/* GSAP 3D Parallax Cards */}
            <div
                ref={cardsContainerRef}
                className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
                style={{ perspective: '1200px' }}
            >
                {heroCards.map((card, i) => (
                    <div
                        key={i}
                        className="hero-card absolute"
                        style={{
                            opacity: 0,
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        {/* Card outer shell */}
                        <div className="relative w-44 h-60 md:w-52 md:h-68 rounded-2xl overflow-hidden shadow-2xl">
                            {/* Colored top accent */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl z-0"
                                style={{ backgroundColor: card.color }}
                            />

                            {/* Card inner */}
                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/20">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                {/* Tag badge */}
                                <div className="absolute top-3 right-3">
                                    <span
                                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
                                        style={{ backgroundColor: `${card.color}cc` }}
                                    >
                                        {card.tag}
                                    </span>
                                </div>

                                {/* Bottom info */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white font-bold text-lg drop-shadow-lg">{card.title}</h3>
                                    <div
                                        className="w-8 h-0.5 rounded-full mt-1"
                                        style={{ backgroundColor: card.color }}
                                    />
                                </div>

                                {/* Glassmorphism shine */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5" />
                            </div>
                        </div>

                        {/* Glow ring — pulses when card lands */}
                        <div
                            className="glow-ring absolute -inset-4 rounded-3xl pointer-events-none"
                            style={{
                                border: `2px solid ${card.color}40`,
                                opacity: 0,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div
                ref={contentRef}
                className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 flex flex-wrap items-baseline justify-center gap-x-4">
                    <span ref={headingLineRef} className="inline-flex" style={{ perspective: '600px' }}>
                        {splitText('Discover the')}
                    </span>
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-india-saffron-300 via-india-saffron-400 to-india-saffron-500 whitespace-nowrap">
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
                    style={{ opacity: 0 }}
                >
                    Curated tour packages across India's most breathtaking destinations.
                    <br />
                    <span className="text-india-saffron-300 font-medium">Your adventure starts here!</span>
                </p>

                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.a
                        href="#packages"
                        whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(255, 143, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="cta-button px-10 py-4 bg-gradient-to-r from-india-saffron-500 to-india-saffron-600 text-white font-bold rounded-full shadow-2xl hover:shadow-india-saffron-500/50 transition-all duration-300"
                        style={{ opacity: 0 }}
                    >
                        Explore Packages
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                        whileTap={{ scale: 0.95 }}
                        className="cta-button px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/40 hover:border-white/60 transition-all duration-300"
                        style={{ opacity: 0 }}
                    >
                        Get Custom Plan
                    </motion.a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[6]"
                style={{ opacity: 0 }}
            >
                <div className="w-7 h-12 border-2 border-white/60 rounded-full flex justify-center p-2">
                    <div className="scroll-dot w-1.5 h-3 bg-white rounded-full" />
                </div>
                <p className="text-white/70 text-sm mt-3 font-medium tracking-wider">SCROLL</p>
            </div>
        </section>
    );
};

export default Hero;
