import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    reactCompiler: true,
    nodeMiddleware: true,
  },
};

export default nextConfig;
