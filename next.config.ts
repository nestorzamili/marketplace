import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output untuk Docker
  output: 'standalone',

  // Optimize images
  images: {
    domains: ['localhost'],
    unoptimized: true, // Untuk development, bisa diubah untuk production
  },
};

export default nextConfig;
