import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export — produces a plain HTML/CSS/JS bundle in ./out that Firebase
    // Hosting can serve on the free Spark plan (no Cloud Functions needed).
    output: 'export',
    images: { unoptimized: true },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
    },
};

export default nextConfig;
