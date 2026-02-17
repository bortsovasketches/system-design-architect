import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/system-design-architect",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
