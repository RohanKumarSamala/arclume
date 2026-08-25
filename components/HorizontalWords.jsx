'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalWords = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');

            // Select the individual stickers instead of just the wrapper
            // or we select the images directly if they are the elements we want to animate.
            // The original logic animated .horizontal-words__sticker-svg, but since you have multiple images:
            const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');

            // Note: To animate SVG paths with strokeDashoffset, the SVG must be inlined in the HTML,
            // not loaded via <img> tags. The current setup uses <img> tags, so direct path animation
            // as written below will not work unless the SVGs are converted to inline <svg> elements.
            // For the purpose of this exercise, we'll assume the intent is for inline SVGs or
            // that the querySelectorAll will find nothing and the animation will gracefully skip.
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            // --- PINNED HORIZONTAL SCROLL ---
            // One trigger that both pins and scrubs. Two co-operating triggers
            // desync here: pinSpacing shifts the document, which re-measures the
            // other trigger's start, so the text finishes travelling before the
            // pin releases and you scroll through a blank section.
            const startX = () => window.innerWidth;
            const endX = () => -(textRef.scrollWidth - window.innerWidth * 0.5);
            // Scroll distance is proportional to how far the text must travel, so
            // the tween always finishes exactly as the pin releases. The factor
            // only sets pacing (lower = text moves faster per pixel scrolled).
            const SCROLL_PACE = 0.55;
            const travel = () => (startX() - endX()) * SCROLL_PACE;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${travel()}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            scrollTween.fromTo(
                textRef,
                { x: startX },
                { x: endX, ease: 'none' }
            );
            // ------------------------------------

            // Bounce each letter randomly
            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%', // Finish as it reaches center
                        scrub: 0.5
                    }
                });
            });

            // Bounce stickers
            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%', // Finish as it reaches center
                        scrub: 0.5
                    }
                });
            });

            // Animate Drawing SVG Arrows 
            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%', // This is the last arrow's end point
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        // The headline's width decides the scroll distance, and it changes when
        // the @font-face fonts swap in and when the sticker images load. Both
        // land after the first measurement, so re-measure on each.
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh).catch(() => {});
        if (document.readyState === 'complete') refresh();
        else window.addEventListener('load', refresh, { once: true });

        return () => {
            window.removeEventListener('load', refresh);
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            <div className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg"><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg" className="horizontal-words__sticker-watch" alt="thumbs up sticker" />
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-cursor.svg" className="horizontal-words__sticker-cursor" alt="cursor sticker" />
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-phone.svg" className="horizontal-words__sticker-phone" alt="phone sticker" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg"><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" ></path></svg>

                    <h2 className="display horizontal-words__h2" aria-label="We turn ambitious ideas into powerful digital experiences">
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>W</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>u</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>a</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>m</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>b</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>o</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>u</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>s</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>d</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>a</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>s</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>o</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>p</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>o</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>w</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>f</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>u</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>l</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>d</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>g</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>a</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>l</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>x</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>p</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>c</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>s</div>
                    </h2>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l">
                    From web development <em>and</em> e-commerce to AI<br />
                    and automation, we build smart, scalable solutions<br />
                    that help businesses move faster.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
