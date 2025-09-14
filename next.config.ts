import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only use Turbopack in development, not in production builds
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      turbo: {
        root: '/home/qualiasolutions/Desktop/Diecast/diecast-hub'
      }
    }
  })
};

export default nextConfig;
