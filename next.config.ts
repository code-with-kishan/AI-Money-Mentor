import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for external domains
  images: {
    domains: [],
    unoptimized: false, // Vercel handles image optimization
  },
  
  // Enable SWC minification (Vercel default)
  swcMinify: true,
  
  // Optimize for Vercel
  productionBrowserSourceMaps: false, // Disable source maps on production
  compress: true, // Enable gzip compression
  
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["recharts", "gsap"],
  },
};

export default nextConfig;
