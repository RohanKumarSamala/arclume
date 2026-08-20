'use client';

const SOUND_FILES = {
    hover: '/sounds/hover.mp3',
    click: '/sounds/click.mp3',
    pop: '/sounds/pop.mp3',
    whoosh: '/sounds/whoosh.mp3',
};

const VOLUMES = {
    hover: 0.16,
    click: 0.32,
    pop: 0.28,
    whoosh: 0.22,
};

let unlocked = false;
const cache = {};

function getAudio(name) {
    if (!cache[name]) {
        const audio = new Audio(SOUND_FILES[name]);
        audio.preload = 'auto';
        audio.volume = VOLUMES[name] ?? 0.3;
        cache[name] = audio;
    }
    return cache[name];
}

// Browsers block audio until a real user gesture happens. Call this once on
// the first pointerdown/keydown so the very first hover/click sound isn't lost.
export function unlockAudio() {
    if (unlocked || typeof window === 'undefined') return;
    unlocked = true;
    Object.keys(SOUND_FILES).forEach((name) => {
        const audio = getAudio(name);
        const wasMuted = audio.muted;
        audio.muted = true;
        audio.play()
            .then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.muted = wasMuted;
            })
            .catch(() => {});
    });
}

export function playSound(name) {
    if (typeof window === 'undefined' || !unlocked) return;
    const base = cache[name];
    if (!base) return;
    // Clone so rapid-fire triggers (fast hovering across cards) overlap
    // instead of cutting each other off mid-sound.
    const instance = base.cloneNode();
    instance.volume = base.volume;
    instance.play().catch(() => {});
}
