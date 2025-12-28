import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};


export default nextConfig;
