import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
  eslint: {
    // ignoreDuringBuilds: true,
  } /* config options here */,
};

export default nextConfig;
