'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS_DATA } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const STICKERS = [
    { name: 'camera', className: 'showreel-sticker--camera' },
    { name: 'smiley', className: 'showreel-sticker--smiley' },
    { name: 'heart', className: 'showreel-sticker--heart' },
    { name: 'phone', className: 'showreel-sticker--phone' },
];

export default function Showreel() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Sticker pop-in
            const stickers = sectionRef.current.querySelectorAll('.showreel-sticker');
            gsap.set(stickers, { scale: 0, opacity: 0 });
            gsap.to(stickers, {
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: 'elastic.out(1, 0.5)',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Count-up numbers
            const numberEls = sectionRef.current.querySelectorAll('.showreel-stat__count');
            numberEls.forEach((el) => {
                const target = parseFloat(el.dataset.value);
                const counter = { val: 0 };
                gsap.to(counter, {
                    val: target,
                    duration: 1.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                    onUpdate: () => {
                        el.textContent = Math.round(counter.val);
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="showreel-section" ref={sectionRef} id="showreel-section">
            {STICKERS.map((sticker) => (
                <div className={`showreel-sticker ${sticker.className}`} key={sticker.name} aria-hidden="true">
                    <img src={`/assets/Card-Sticker SVG/sticker-${sticker.name}.svg`} alt="" width="100%" loading="lazy" />
                </div>
            ))}

            <div className="showreel__content">
                <div className="showreel__kicker-wrap">
                    <p className="showreel__kicker">
                        <span className="showreel__kicker-bold">The numbers</span>
                        <span className="showreel__kicker-italic">so far.</span>
                    </p>
                    <div className="showreel-sticker showreel-sticker--kicker" aria-hidden="true">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-100.svg" alt="" width="100%" loading="lazy" />
                    </div>
                </div>
                <div className="showreel__stats">
                    {STATS_DATA.map((stat) => (
                        <div className={`showreel-stat showreel-stat--${stat.color}`} key={stat.label}>
                            <div className="showreel-sticker showreel-stat__sticker" aria-hidden="true">
                                <img src={`/assets/Card-Sticker SVG/sticker-${stat.sticker}.svg`} alt="" width="100%" loading="lazy" />
                            </div>
                            <p className="showreel-stat__number">
                                <span className="showreel-stat__count" data-value={stat.value}>0</span>
                                <span className="showreel-stat__suffix">{stat.suffix}</span>
                            </p>
                            <p className="showreel-stat__label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
