/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Wildcard for all domains
            },
        ],
    },
}

export default nextConfig;
