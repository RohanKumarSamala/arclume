import './globals.css';
import TransitionScribble from '@/components/TransitionScribble';

export const metadata = {
    title: 'arclume — Automate the ordinary. Build the extraordinary.',
    description: 'arclume is a digital studio building web development, e-commerce, AI and automation solutions that help businesses move faster.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                {/* Lives in the layout so it stays mounted across route changes —
                    the sweep runs as one timeline instead of being torn in half. */}
                <TransitionScribble />
            </body>
        </html>
    );
}
