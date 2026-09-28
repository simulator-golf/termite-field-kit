import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // The whole site is one static page in public/; serve it at the root URL.
    return [{ source: "/", destination: "/field-kit.html" }];
  },
};

export default nextConfig;
