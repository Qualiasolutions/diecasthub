import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      root: '/home/qualiasolutions/Desktop/Diecast/diecast-hub'
    }
  }
};

export default nextConfig;
