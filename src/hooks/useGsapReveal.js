import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

/**
 * Premium GSAP ScrollTrigger reveal animations hook.
 * Provides storytelling-style animations triggered on scroll.
 *
 * @param {string} preset - Animation preset name
 * @param {object} options - Configuration options
 * @returns {React.RefObject} - Ref to attach to the animated element
 */
export const useGsapReveal = (preset = 'fadeUp', options = {}) => {
    const ref = useRef(null);
    const {
        delay = 0,
        duration = 1,
        stagger = 0.15,
        start = 'top 85%',
        end = 'bottom 20%',
        markers = false,
        once = true,
        scrub = false,
        children = false, // animate direct children instead of element itself
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const targets = children ? el.children : el;
            const triggerConfig = {
                trigger: el,
                start,
                end,
                markers,
                toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                ...(scrub ? { scrub: typeof scrub === 'number' ? scrub : 1 } : {}),
            };

            switch (preset) {
                case 'fadeUp':
                    gsap.fromTo(targets, {
                        opacity: 0,
                        y: 60,
                    }, {
                        opacity: 1,
                        y: 0,
                        duration,
                        delay,
                        ease: 'power3.out',
                        stagger: children ? stagger : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'fadeDown':
                    gsap.fromTo(targets, {
                        opacity: 0,
                        y: -60,
                    }, {
                        opacity: 1,
                        y: 0,
                        duration,
                        delay,
                        ease: 'power3.out',
                        stagger: children ? stagger : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'fadeLeft':
                    gsap.fromTo(targets, {
                        opacity: 0,
                        x: -80,
                    }, {
                        opacity: 1,
                        x: 0,
                        duration,
                        delay,
                        ease: 'power3.out',
                        stagger: children ? stagger : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'fadeRight':
                    gsap.fromTo(targets, {
                        opacity: 0,
                        x: 80,
                    }, {
                        opacity: 1,
                        x: 0,
                        duration,
                        delay,
                        ease: 'power3.out',
                        stagger: children ? stagger : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'scaleIn':
                    gsap.fromTo(targets, {
                        opacity: 0,
                        scale: 0.8,
                    }, {
                        opacity: 1,
                        scale: 1,
                        duration,
                        delay,
                        ease: 'back.out(1.7)',
                        stagger: children ? stagger : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'clipReveal':
                    gsap.fromTo(targets, {
                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                        opacity: 0,
                    }, {
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        opacity: 1,
                        duration: duration * 1.2,
                        delay,
                        ease: 'power4.inOut',
                        stagger: children ? stagger * 1.5 : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'staggerUp':
                    gsap.fromTo(el.children, {
                        opacity: 0,
                        y: 50,
                        scale: 0.95,
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay,
                        ease: 'power3.out',
                        stagger,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'staggerScale':
                    gsap.fromTo(el.children, {
                        opacity: 0,
                        scale: 0.6,
                        rotateY: 15,
                    }, {
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        duration: 0.8,
                        delay,
                        ease: 'back.out(1.4)',
                        stagger,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'parallaxBg':
                    gsap.to(targets, {
                        y: options.distance || 100,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
                    break;

                case 'rotateIn':
                    gsap.fromTo(targets, {
                        opacity: 0,
                        rotateX: -15,
                        y: 40,
                        transformOrigin: '50% 100%',
                    }, {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        duration,
                        delay,
                        ease: 'power3.out',
                        stagger: children ? stagger : 0,
                        scrollTrigger: triggerConfig,
                    });
                    break;

                case 'splitText': {
                    const chars = el.querySelectorAll('.gsap-char');
                    if (chars.length > 0) {
                        gsap.fromTo(chars, {
                            opacity: 0,
                            y: 50,
                            rotateX: -90,
                        }, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.8,
                            delay,
                            ease: 'back.out(1.7)',
                            stagger: 0.03,
                            scrollTrigger: triggerConfig,
                        });
                    }
                    break;
                }

                default:
                    // Default to fadeUp
                    gsap.fromTo(targets, {
                        opacity: 0,
                        y: 60,
                    }, {
                        opacity: 1,
                        y: 0,
                        duration,
                        delay,
                        ease: 'power3.out',
                        scrollTrigger: triggerConfig,
                    });
            }
        }, ref);

        return () => ctx.revert();
    }, []);

    return ref;
};

export default useGsapReveal;

