import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  distDir: "./dist", // Set the output directory for the build
};

export default nextConfig;
