'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from '@/lib/data';

export default function TransitionScribble() {
    useEffect(() => {
        const transitionScribblePath = document.querySelector('.transition-scribble path');
        const transitionScribbleSvg = document.querySelector('.transition-scribble');

        if (!transitionScribblePath || !transitionScribbleSvg) return;

        const transitionColors = [
            'var(--color-green)', 'var(--color-lightblue)', 'var(--color-darkblue)',
            'var(--color-lightgreen)', 'var(--color-orange)', 'var(--color-maroon)', 'var(--color-pink)'
        ];

        const config = ANIMATION_CONFIG.transitionScribble || {};
        const durIn = config.durationIn || 0.7;
        const durOut = config.durationOut || 1.1;

        const pathLength = transitionScribblePath.getTotalLength();
        const l = pathLength + 5;

        // Check if we are mounted right after a page transition
        const isPending = typeof window !== 'undefined' && sessionStorage.getItem('scribble_pending') === '1';
        const savedColor = typeof window !== 'undefined' ? sessionStorage.getItem('scribble_color') : null;

        if (isPending) {
            sessionStorage.removeItem('scribble_pending');
            const currentColor = savedColor || transitionColors[Math.floor(Math.random() * transitionColors.length)];
            transitionScribbleSvg.style.color = currentColor;

            // Start ALREADY COVERED (no page flash!)
            gsap.set(transitionScribbleSvg, { scale: config.scale || 0.7, opacity: 1, x: 0, y: 0, rotation: 0 });
            gsap.set(transitionScribblePath, {
                strokeDasharray: l,
                strokeDashoffset: 0,
                strokeWidth: config.strokeWidthMax || '31%',
                opacity: 1
            });

            document.body.classList.add('is-transitioning');

            // Play OUT phase immediately to reveal newly loaded page
            const drawOutTl = gsap.timeline({
                onComplete: () => {
                    document.body.classList.remove('is-transitioning');
                    gsap.set(transitionScribblePath, { strokeWidth: '0%' });
                }
            });

            drawOutTl.to(transitionScribblePath, { strokeDashoffset: -l, duration: durOut, ease: 'power2.inOut' }, 0);
            drawOutTl.to(transitionScribblePath, { strokeWidth: config.strokeWidthStart || '8%', duration: durOut, ease: 'power2.inOut' }, 0);
        }

        // Trigger transition before navigating
        const startTransitionTo = (targetHref) => {
            if (gsap.isTweening(transitionScribblePath) || document.body.classList.contains('is-transitioning')) return;

            const randomColor = transitionColors[Math.floor(Math.random() * transitionColors.length)];
            transitionScribbleSvg.style.color = randomColor;
            sessionStorage.setItem('scribble_color', randomColor);
            sessionStorage.setItem('scribble_pending', '1');

            gsap.set(transitionScribbleSvg, { scale: config.scale || 0.7 });
            gsap.set(transitionScribblePath, {
                strokeDasharray: l,
                strokeDashoffset: l,
                strokeWidth: config.strokeWidthStart || '8%',
                opacity: 1
            });
            gsap.set(transitionScribbleSvg, { opacity: 1, x: 0, y: 0, rotation: 0 });

            document.body.classList.add('is-transitioning');
            const cursorBubble = document.querySelector('.cursor-bubble');
            if (cursorBubble) gsap.to(cursorBubble, { opacity: 0, duration: 0.15 });

            const drawInTl = gsap.timeline({
                onComplete: () => {
                    window.location.href = targetHref;
                }
            });

            drawInTl.to(transitionScribblePath, { strokeDashoffset: 0, duration: durIn * 0.6, ease: 'power1.inOut' }, 0);
            drawInTl.to(transitionScribblePath, { strokeWidth: config.strokeWidthMax || '31%', duration: durIn * 0.6, ease: 'power2.inOut' }, 0);
        };

        // Attach click interceptor to all transition links
        const handleLinkClick = (e) => {
            const anchor = e.currentTarget || e.target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

            // Prevent transition if already on that exact path
            if (href === window.location.pathname) return;

            e.preventDefault();
            e.stopPropagation();
            startTransitionTo(href);
        };

        // Bind to navbar elements and work buttons
        const selectors = ['.logo-truus', '.logo-work-container', '.nav-work-btn', '.nav-work-item', '.transition-link'];
        const elements = document.querySelectorAll(selectors.join(','));

        elements.forEach((el) => el.addEventListener('click', handleLinkClick));

        return () => {
            elements.forEach((el) => el.removeEventListener('click', handleLinkClick));
        };
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 3222 3114"
            fill="none"
            preserveAspectRatio="none"
            className="transition-scribble"
        >
            <path
                d="M299.654 453.865C505.574 319.225 711.494 184.585 836.054 109.945C960.614 35.3048 997.574 24.7448 944.014 110.385C890.454 196.025 745.254 378.185 571.454 634.385C397.654 890.585 199.654 1215.3 110.854 1382.58C22.0544 1549.86 48.4544 1549.86 77.8944 1540.62C107.334 1531.38 139.014 1512.9 367.854 1319.9C596.694 1126.9 1021.73 759.945 1255.21 555.065C1488.69 350.185 1517.73 318.505 1527.41 306.145C1537.09 293.785 1526.53 301.705 1346.85 618.625C1167.17 935.545 818.694 1561.22 635.214 1896.74C451.734 2232.26 443.814 2258.66 447.654 2268.3C451.494 2277.94 467.334 2270.02 511.134 2236.9C554.934 2203.78 626.214 2145.7 966.534 1817.46C1306.85 1489.22 1914.05 892.585 2263.81 557.505C2613.57 222.425 2687.49 166.985 2741.41 129.185C2795.33 91.3848 2827.01 72.9048 2843.33 67.3448C2859.65 61.7848 2859.65 69.7048 2849.09 96.2248C2838.53 122.745 2817.41 167.625 2584.77 544.505C2352.13 921.385 1370.37 2165.43 1139.25 2537.83C908.134 2910.23 902.854 2926.07 902.774 2939.51C902.694 2952.95 907.974 2963.51 1255.21 2613.87C1602.45 2264.23 2829.73 1017.54 2903.53 1071.46C2977.33 1125.38 2176.12 2817.04 2128 3037C2079.88 3256.96 2911.24 2018.56 3172 1793"
                stroke="currentColor"
                strokeLinecap="round"
                style={{ strokeWidth: '0%', strokeDashoffset: '0.001', strokeDasharray: '0px, 999999px' }}
            />
        </svg>
    );
}
