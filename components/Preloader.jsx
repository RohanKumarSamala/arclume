'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STICKERS = ['smiley', 'heart', 'camera', 'phone'];

export default function Preloader() {
    const rootRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const countEl = root.querySelector('.preloader__count');
        const barFill = root.querySelector('.preloader__bar-fill');
        const logo = root.querySelector('.preloader__logo');
        const footer = root.querySelector('.preloader__footer');
        const stickers = root.querySelectorAll('.preloader__sticker');

        // Scroll stays locked until the intro finishes so the hero can't be
        // scrolled past while it's still hidden behind the overlay.
        document.body.classList.add('is-preloading');
        window.__lenis?.stop();

        const teardown = () => {
            document.body.classList.remove('is-preloading');
            window.__lenis?.start();
            root.style.display = 'none';
            // Sections were measured while the overlay was up — let ScrollTrigger
            // recalculate now that the real layout is visible and scrollable.
            ScrollTrigger.refresh();
        };

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            teardown();
            return;
        }

        // Exit only once BOTH the intro animation has played out and the page
        // has actually finished loading — whichever lands last.
        let introDone = false;
        let pageLoaded = document.readyState === 'complete';
        let exited = false;

        const tryExit = () => {
            if (exited || !introDone || !pageLoaded) return;
            exited = true;
            playExit();
        };

        const onLoad = () => {
            pageLoaded = true;
            tryExit();
        };
        if (!pageLoaded) window.addEventListener('load', onLoad, { once: true });

        const ctx = gsap.context(() => {
            gsap.set(logo, { autoAlpha: 0, scale: 0.86 });
            gsap.set(stickers, { scale: 0, autoAlpha: 0 });
            gsap.set(barFill, { scaleX: 0 });

            const progress = { val: 0 };

            gsap.timeline({ onComplete: () => { introDone = true; tryExit(); } })
                .to(logo, { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.6)' }, 0)
                .to(stickers, {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'elastic.out(1, 0.5)',
                    stagger: 0.1,
                }, 0.2)
                .to(progress, {
                    val: 100,
                    duration: 1.7,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        countEl.textContent = String(Math.round(progress.val)).padStart(3, '0');
                        gsap.set(barFill, { scaleX: progress.val / 100 });
                    },
                }, 0.15);
        }, rootRef);

        function playExit() {
            gsap.timeline({ onComplete: teardown })
                // Quick wiggle on the wordmark before it leaves
                .to(logo, { rotation: 4, duration: 0.08, repeat: 3, yoyo: true, ease: 'steps(1)' })
                .to(footer, { autoAlpha: 0, y: 14, duration: 0.3, ease: 'power2.in' }, 0)
                .to(stickers, {
                    scale: 0,
                    autoAlpha: 0,
                    duration: 0.35,
                    ease: 'back.in(1.8)',
                    stagger: 0.05,
                }, 0.05)
                .to(logo, { autoAlpha: 0, scale: 1.15, duration: 0.4, ease: 'power2.in' }, 0.32)
                // Curtain lifts, easing its rounded bottom edge flat as it goes
                .to(root, {
                    yPercent: -100,
                    borderBottomLeftRadius: '50% 12%',
                    borderBottomRightRadius: '50% 12%',
                    duration: 1,
                    ease: 'power4.inOut',
                }, 0.45);
        }

        return () => {
            window.removeEventListener('load', onLoad);
            ctx.revert();
            document.body.classList.remove('is-preloading');
            window.__lenis?.start();
        };
    }, []);

    return (
        <div className="preloader" ref={rootRef} role="status" aria-label="Loading arclume">
            {STICKERS.map((name, i) => (
                <div className={`preloader__sticker preloader__sticker--${i + 1}`} key={name} aria-hidden="true">
                    <img src={`/assets/Card-Sticker SVG/sticker-${name}.svg`} alt="" width="100%" />
                </div>
            ))}

            <div className="preloader__center">
                <div className="preloader__logo" aria-hidden="true"></div>
            </div>

            <div className="preloader__footer">
                <div className="preloader__bar" aria-hidden="true">
                    <div className="preloader__bar-fill"></div>
                </div>
                <div className="preloader__count-wrap">
                    <span className="preloader__count">000</span>
                    <span className="preloader__count-sign">%</span>
                </div>
            </div>
        </div>
    );
}
