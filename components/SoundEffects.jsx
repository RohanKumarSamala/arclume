'use client';

import { useEffect } from 'react';
import { unlockAudio, playSound } from '@/lib/sound';

// Standard interactive elements + every hand-picked hoverable spot already
// used by the site's own custom cursor (CursorBubble) + the playful card
// components that react to hover, so sound coverage matches what already
// visually responds to the mouse.
const INTERACTIVE_SELECTOR = [
    'a', 'button', '[role="button"]', 'input', 'select', 'textarea', 'summary',
    '.footer-column h3', '.footer-email',
    '.logo-truus', '.nav-work-btn', '.nav-work-item',
    '.card', '.motion-card__card',
].join(', ');

function findInteractive(el) {
    let node = el;
    let depth = 0;
    while (node && node.nodeType === 1 && node !== document.body && depth < 8) {
        if (node.matches?.(INTERACTIVE_SELECTOR)) return node;
        const cursor = window.getComputedStyle(node).cursor;
        if (cursor && cursor.includes('pointer')) return node;
        node = node.parentElement;
        depth += 1;
    }
    return null;
}

export default function SoundEffects() {
    useEffect(() => {
        const onFirstInteract = () => unlockAudio();
        window.addEventListener('pointerdown', onFirstInteract, { once: true });
        window.addEventListener('keydown', onFirstInteract, { once: true });

        const onMouseOver = (e) => {
            const target = findInteractive(e.target);
            if (!target) return;
            if (target.contains(e.relatedTarget)) return;
            playSound('hover');
        };

        const onClick = (e) => {
            const target = findInteractive(e.target);
            if (!target) return;
            playSound('click');
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('click', onClick);
            window.removeEventListener('pointerdown', onFirstInteract);
            window.removeEventListener('keydown', onFirstInteract);
        };
    }, []);

    return null;
}
