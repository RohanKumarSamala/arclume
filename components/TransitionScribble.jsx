'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG } from '@/lib/data';

// Sweep colours, all from the site palette (ink / accent / deep paper).
const TRANSITION_COLORS = ['var(--ink)', 'var(--accent)', 'var(--paper-deep)'];
const LIGHT_COLORS = ['var(--accent)', 'var(--paper-deep)'];

// Routes that should not get the intro sweep.
const NO_INTRO = ['/admin'];

export default function TransitionScribble() {
    const router = useRouter();
    const pathname = usePathname();
    // Survives StrictMode's effect → cleanup → effect cycle in dev.
    const introPlayed = useRef(false);
    const svgRef = useRef(null);
    const logoBoxRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        const path = svg?.querySelector('path');
        if (!svg || !path) return;

        const config = ANIMATION_CONFIG.transitionScribble || {};
        const durIn = config.durationIn || 0.8;
        const durOut = config.durationOut || 1.6;

        let running = false;

        /**
         * One continuous sweep: cover the screen, swap the route while covered
         * (client-side, so nothing unmounts this component), then uncover.
         */
        const runScribble = (targetHref = null) => {
            if (running || document.body.classList.contains('is-transitioning')) return;
            running = true;

            gsap.set(svg, { scale: config.scale || 0.7, opacity: 1, x: 0, y: 0, rotation: 0 });

            const l = Math.ceil(path.getTotalLength() + 4000);
            // Random colour each sweep, never the same one twice in a row —
            // remembered per tab so a reload also gets a fresh colour.
            let last = -1;
            try { last = Number(sessionStorage.getItem('arclume:sweep') ?? -1); } catch {}
            let idx = Math.floor(Math.random() * TRANSITION_COLORS.length);
            if (idx === last) idx = (idx + 1) % TRANSITION_COLORS.length;
            try { sessionStorage.setItem('arclume:sweep', String(idx)); } catch {}
            const color = TRANSITION_COLORS[idx];
            svg.style.color = color;

            // Rendered as part of this component's JSX — never injected into
            // <body>, which React owns and would fail to reconcile.
            const logoBox = logoBoxRef.current;
            if (logoBox) logoBox.style.color = LIGHT_COLORS.includes(color) ? '#000' : '#fff';
            const mark = logoBox?.firstElementChild;

            gsap.set(path, {
                strokeDasharray: `${l} ${l}`,
                strokeDashoffset: l,
                strokeWidth: config.strokeWidthStart || '8%',
                opacity: 1,
            });
            gsap.set(logoBox, { autoAlpha: 0, scale: 1 });

            document.body.classList.add('is-transitioning');
            const bubble = document.querySelector('.cursor-bubble');
            if (bubble) gsap.to(bubble, { opacity: 0, duration: 0.2 });

            const tl = gsap.timeline({
                onComplete: () => {
                    running = false;
                    document.body.classList.remove('is-transitioning');
                    gsap.set(path, { strokeWidth: '0%', opacity: 0 });
                    gsap.set(logoBox, { autoAlpha: 0 });
                    if (mark) {
                        gsap.killTweensOf(mark);
                        gsap.set(mark, { rotation: 0 });
                    }
                },
            });

            // 1. Cover
            tl.to(path, { strokeDashoffset: 0, duration: durIn, ease: 'power1.inOut' }, 0)
              .to(path, { strokeWidth: config.strokeWidthMax || '31%', duration: durIn, ease: 'power2.inOut' }, 0);

            // 2. Wordmark in / out while covered
            if (mark) {
                tl.to(logoBox, {
                    autoAlpha: 1,
                    duration: durIn * 0.4,
                    ease: 'power2.out',
                    onStart: () => gsap.to(mark, {
                        rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)', overwrite: 'auto',
                    }),
                }, durIn * 0.3);

                tl.to(logoBox, { autoAlpha: 0, duration: durOut * 0.4, ease: 'power2.in' }, durIn + durOut * 0.3);
            }

            // 3. Swap route (or scroll home) at full cover — client-side, no reload
            tl.call(() => {
                if (targetHref && targetHref !== window.location.pathname) {
                    // ScrollTrigger's pinning wraps sections in .pin-spacer divs
                    // that React never created. Leaving them in place during a
                    // client-side route swap breaks reconciliation, so revert
                    // them (kill(true)) before handing over to the router.
                    ScrollTrigger.getAll().forEach((t) => t.kill(true));
                    router.push(targetHref);
                } else {
                    const lenis = window.__lenis;
                    if (lenis) lenis.scrollTo(0, { immediate: true });
                    else window.scrollTo(0, 0);
                }
            }, null, durIn);

            // 4. Uncover
            tl.to(path, { strokeDashoffset: -l, duration: durOut, ease: 'power2.inOut' }, durIn)
              .to(path, { strokeWidth: '0%', duration: durOut, ease: 'power2.in' }, durIn);
        };

        // Delegated so it keeps working after client-side navigation swaps the DOM.
        const onClick = (e) => {
            const el = e.target.closest?.('.logo-truus, .logo-work-container, .nav-work-btn, .nav-work-item');
            if (!el) return;

            const anchor = el.matches('a') ? el : el.closest('a');
            const href = anchor?.getAttribute('href') || null;
            if (href && (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))) return;

            e.preventDefault();
            e.stopPropagation();
            runScribble(href);
        };

        document.addEventListener('click', onClick, true);

        // Intro on first load only — later route changes animate via the click above.
        let introTimer;
        if (!introPlayed.current && !NO_INTRO.includes(pathname)) {
            introPlayed.current = true;
            introTimer = setTimeout(() => runScribble(null), 100);
        }

        return () => {
            document.removeEventListener('click', onClick, true);
            clearTimeout(introTimer);
        };
        // Bound once; navigation is handled by delegation, not by re-running this.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <div className="transition-logo" ref={logoBoxRef} aria-hidden="true">
            <div className="logo-truus transition-logo__mark"></div>
        </div>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 3222 3114"
            fill="none"
            preserveAspectRatio="none"
            className="transition-scribble"
            ref={svgRef}
        >
            <path
                d="M299.654 453.865C505.574 319.225 711.494 184.585 836.054 109.945C960.614 35.3048 997.574 24.7448 944.014 110.385C890.454 196.025 745.254 378.185 571.454 634.385C397.654 890.585 199.654 1215.3 110.854 1382.58C22.0544 1549.86 48.4544 1549.86 77.8944 1540.62C107.334 1531.38 139.014 1512.9 367.854 1319.9C596.694 1126.9 1021.73 759.945 1255.21 555.065C1488.69 350.185 1517.73 318.505 1527.41 306.145C1537.09 293.785 1526.53 301.705 1346.85 618.625C1167.17 935.545 818.694 1561.22 635.214 1896.74C451.734 2232.26 443.814 2258.66 447.654 2268.3C451.494 2277.94 467.334 2270.02 511.134 2236.9C554.934 2203.78 626.214 2145.7 966.534 1817.46C1306.85 1489.22 1914.05 892.585 2263.81 557.505C2613.57 222.425 2687.49 166.985 2741.41 129.185C2795.33 91.3848 2827.01 72.9048 2843.33 67.3448C2859.65 61.7848 2859.65 69.7048 2849.09 96.2248C2838.53 122.745 2817.41 167.625 2584.77 544.505C2352.13 921.385 1370.37 2165.43 1139.25 2537.83C908.134 2910.23 902.854 2926.07 902.774 2939.51C902.694 2952.95 907.974 2963.51 1255.21 2613.87C1602.45 2264.23 2829.73 1017.54 2903.53 1071.46C2977.33 1125.38 2176.12 2817.04 2128 3037C2079.88 3256.96 2911.24 2018.56 3172 1793"
                stroke="currentColor"
                strokeLinecap="round"
                style={{ strokeWidth: '0%', strokeDashoffset: '0.001', strokeDasharray: '0px, 999999px' }}
            />
        </svg>
        </>
    );
}
