import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  // Explicitly allow webpack since next-pwa requires it and Next 16 defaults to strict turbopack
  webpack: (config) => {
    return config;
  },
  // Ensure we don't crash when running next dev with turbopack enabled by default in Next 16
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com", // anticipating other google domains
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default withPWA(nextConfig);
