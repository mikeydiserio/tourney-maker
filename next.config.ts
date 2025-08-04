import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ["src/app", "src/components", "src/lib"],
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  output: "standalone", // Use standalone output for better performance
  distDir: "dist", // Set the output directory for the build
};

export default nextConfig;
