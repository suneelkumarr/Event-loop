import type { NextConfig } from "next";

const repoName = '/Event-loop'; // 👈 Replace this with your GitHub repo name

const nextConfig: NextConfig = {
  // Enable static export mode for GitHub Pages
  output: "export",

  // Required for GitHub Pages (hosted under a subpath)
  basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : "",

  // Disable image optimization since GitHub Pages doesn’t support Next.js Image Optimization
  images: {
    unoptimized: true,
  },

  // TypeScript and ESLint options
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // React settings
  reactStrictMode: false,

  // Custom webpack settings
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack hot reload (optional)
      config.watchOptions = {
        ignored: ["**/*"],
      };
    }
    return config;
  },
};

export default nextConfig;
