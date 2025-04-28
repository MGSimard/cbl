import type { NextConfig } from "next";
import "./src/env.js";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    reactCompiler: true,
    nodeMiddleware: true,
  },
};

export default nextConfig;
