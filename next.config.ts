import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Keep links from the old Angular site working.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/admission", destination: "/admissions", permanent: true },
    ];
  },
};

export default nextConfig;
