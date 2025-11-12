import type { NextConfig } from "next";

const repoName = "Event-loop"; // ✅ Do not include a leading slash

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Export static HTML for GitHub Pages
  output: "export",

  // GitHub Pages serves your site from /Event-loop
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  // Disable Next.js image optimization (GitHub Pages is static)
  images: {
    unoptimized: true,
  },

  // Allow builds even with type/ESLint warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional: disable hot reload in dev
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ["**/*"],
      };
    }
    return config;
  },
};

export default nextConfig;
